import { Module } from '@nestjs/common';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Interview, InterviewSchema } from './interview.schema';
import { User, UserSchema } from '../user/user.schema';
import { Comment, CommentSchema } from 'src/comment/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Interview.name,
        schema: InterviewSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [InterviewController],
  providers: [InterviewService],
})
export class InterviewModule {}
