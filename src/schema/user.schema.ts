import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

//export type userDocument = User & Document

@Schema()
export class User extends Document {
    @Prop({required: true, unique: true})
    email : string

    @Prop({required: true})
    firstname : string

    @Prop({required: true})
    lastname : string

    @Prop({required: true})
    password : string

    
}
// export const User = new mongoose.Schema({
//     email : String,

//     firstname: String,

//     lastname: String,

//     password: String,
// },
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

export const UserSchema = SchemaFactory.createForClass(User)