import { Body, Controller, Get, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { Roles } from 'src/role/decorator/role.decorator';
import { Role } from 'src/role/enum/role.enum';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
    constructor(private prisma: PrismaService, private post : PostService){}
    
    @Get()
    //const User = this.prisma.user
    getUser(@GetUser() user: User ){
        return user
    }
    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
        { name: 'background', maxCount: 1 },
      ]))
    async upload(@UploadedFiles() files: { file?: Express.Multer.File[], background?: Express.Multer.File[] }){
        console.log(files)
        const file = await FileService.cloudinaryUpload(files);
        if (file) return "file found"
    }

    @Post('create')
    //@Roles(Role.Admin)
    createPost(@GetUser('id') userId: string, @Body() dto: CreatePostDTO){
        return this.post.createPost(userId, dto);
    }
}


// const file = await upload(req.file);
//     if (file) {
//       createAsset.logo = file;
//       await createAsset.save();
//     }


// @Post('upload')
//     @UseInterceptors(FileInterceptor('file',  {
//         storage: diskStorage({
//           destination: './uploadedFiles'
//         })
//       }))
//     upload(@UploadedFile() file: Express.Multer.File){
//         console.log(file)
//     }