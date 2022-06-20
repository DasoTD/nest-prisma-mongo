import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDTO } from './dto';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService){

    }
    createPost(userId: string, dto: CreatePostDTO){
        return this.prisma.post.create({
            data: {
                ...dto,
                userId
            }
        })
    }
}
