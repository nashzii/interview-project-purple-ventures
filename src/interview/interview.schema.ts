import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export enum TodoStatus {
  TODO = 'To Do',
  INPROGRESS = 'In Progress',
  DONE = 'Done',
}

@Schema()
export class Interview {
  @Prop({ required: true })
  interviewName: string;

  @Prop({ type: String, textarea: true, default: '' })
  description: string;

  @Prop({ default: TodoStatus.TODO, enum: TodoStatus })
  status: TodoStatus;

  @Prop({ default: new Date().toISOString() })
  createDate: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createBy: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  comments: mongoose.Schema.Types.ObjectId[];

  @Prop({ default: false })
  archive: boolean;
}
export type InterviewDocument = Interview & Document;
export const InterviewSchema = SchemaFactory.createForClass(Interview);
