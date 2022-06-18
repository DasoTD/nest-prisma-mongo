import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
    imports: [ MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [MongooseModule]
})
export class AuthModule {}
