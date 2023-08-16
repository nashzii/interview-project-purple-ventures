import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatar: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
