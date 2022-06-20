import { Injectable } from '@nestjs/common';
import cloudinary from 'src/utils/cloudinary';

@Injectable()
export class FileService {
    static async cloudinaryUpload(file: any) {
        const upload = await cloudinary.uploader.upload(file.path);
        return upload.secure_url;
      }
}
