import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SigninDto } from './dto';
import * as dotenv from 'dotenv'
import { Request } from 'express';

dotenv.config() // Load the environment variables


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }

    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log(dto)
        console.log(`The connection URL is ${process.env.DATABASE_URL}`)
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: SigninDto, @Req() req: Request){
        console.log(dto)
        console.log(`The connection URL is ${process.env.DATABASE_URL}`)
        //return this.authService.save(dto)
        return this.authService.signin(dto, req)
    }

    @Get()
    users(){
        return this.authService.getUsers()
    }
}
