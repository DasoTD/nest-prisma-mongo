import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = User & Document

@Schema()
export class User {
    @Prop({required: true})
    email : string

    @Prop({required: true})
    firstname : string

    @Prop({required: true})
    lastname : string
}

export const UserSchema = SchemaFactory.createForClass(User)