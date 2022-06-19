import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { AuthDto, SigninDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient(); 

@Injectable()
export class AuthService {
    constructor(@InjectModel(
        User.name) private userModel: Model<User>, 
        private prisma: PrismaService, 
        private jwt: JwtService){}
     async signup(dto : AuthDto): Promise<User>{

        try {
            const password = await argon.hash(dto.password);
            const body = new this.userModel({
                //dto
                email: dto.email,
                firstname: dto.firstname,
                lastname: dto.lastname,
                nickname: dto.nickname,
                password,
            }) 
            console.log(body)
            return body.save()
        } catch (error: any) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('credentials already taken')
                }
            } 
            throw error
        }
    }

    async save(dto: AuthDto){
        //create hassh
        const password = await argon.hash(dto.password);
            const data = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    firstname: dto.firstname,
                    lastname: dto.lastname,
                    nickname: dto.nickname,
                    password,
                }
            })
            delete data.password

            return data
        
    }

    async signin(dto: SigninDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where:{
                    email: dto.email
                }
            })
            if(!user) throw new ForbiddenException("credentials incorrect")
            const isMatch = await argon.verify(user.password, dto.password)

            //if incorrect throw exception
            if(!isMatch) throw new ForbiddenException('password does not match')
            return this.signToken(user.id, user.email) 
            //delete user.hash
        } catch (error:any) {
            
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const users = await this.userModel.find().exec()
            return users
        } catch (error: any) {
            
        }
    }
    async signToken(userId: string, email: string ): Promise<{access_token}>{
        const payload ={
            sub: userId,
            email
        };
        const secret =  process.env.JWT_SECRET //this.config.get('jWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1h',
            secret: secret
        })
        return {
            access_token: token
        }
    }
}
