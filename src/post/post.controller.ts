import { Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';
import { FileInterceptor , FilesInterceptor, FileFieldsInterceptor} from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
    constructor(private prisma: PrismaService){}
    @UseGuards(JwtGuard)
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
}


// const file = await upload(req.file);
//     if (file) {
//       createAsset.logo = file;
//       await createAsset.save();
//     }