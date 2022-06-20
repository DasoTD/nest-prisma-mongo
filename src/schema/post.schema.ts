import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class Post extends Document {
    @Prop({required: true})
    title : String

    @Prop({required: true})
    description: String

    @Prop()
    link: String

}
// {
//     timestamps: true,
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = doc._id;
//         delete ret._id;
//         delete ret.__v;
//       },
//     },
//   }
// )

export const PostSchema = SchemaFactory.createForClass(Post)
