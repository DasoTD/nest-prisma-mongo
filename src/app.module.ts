import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [PrismaService, AuthModule, PrismaModule, MongooseModule.forRoot(process.env.DB)],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}
