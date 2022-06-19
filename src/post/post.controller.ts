import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('posts')
export class PostController {
    constructor(private prisma: PrismaService){}
    @UseGuards(JwtGuard)
    @Get()
    //const User = this.prisma.user
    getUser(@GetUser() user: User ){
        return user
    }
}
