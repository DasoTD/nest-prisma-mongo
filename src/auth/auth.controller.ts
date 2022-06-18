import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import * as dotenv from 'dotenv'

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

    @Post('signin')
    signin(@Body() dto: AuthDto){
        console.log(dto)
        console.log(`The connection URL is ${process.env.DATABASE_URL}`)
        return this.authService.save(dto)
    }

    @Get()
    users(){
        return this.authService.getUsers()
    }
}
