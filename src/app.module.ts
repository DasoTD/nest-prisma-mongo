import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { FileService } from './file/file.service';

dotenv.config()

@Module({
  imports: [ ConfigModule.forRoot({}), JwtService, PrismaService, AuthModule, PrismaModule, MongooseModule.forRoot(process.env.DB), PostModule],
  controllers: [AuthController, PostController],
  providers: [AppService, AuthService, PrismaService, JwtService, PostService, FileService],
})
export class AppModule {}
