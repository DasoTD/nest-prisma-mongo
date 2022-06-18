import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from 'src/schema/user.schema';
import { Model } from 'mongoose';
const prisma = new PrismaClient(); 

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<userDocument>, private prisma: PrismaService){}
     async signup(dto : AuthDto): Promise<User>{

        try {
            const body = new this.userModel(dto) 
            console.log(body)
            return body.save()
        } catch (error: any) {
            throw new ForbiddenException("error ")
        }
    }

    async save(dto: AuthDto){
    
            const data = await this.prisma.user.create({
                data: {
                    ...dto
                }
            })
            return data
        
    }

    async getUsers(): Promise<User[]> {
        try {
            const users = await this.userModel.find().exec()
            return users
        } catch (error: any) {
            
        }
    }
}
