import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Interview, InterviewDocument } from './interview.schema';
import { CreateInterviewDto } from './dto/create-interview';
import { EditInterviewDto } from './dto/edit-interview';
import { AddCommentDto } from 'src/comment/dto/add-comment';
import { Comment, CommentDocument } from '../comment/comment.schema';

@Injectable()
export class InterviewService {
  constructor(
    @InjectModel(Interview.name)
    private readonly interviewModel: Model<InterviewDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async getInterview(
    page: number,
    limit: number,
  ): Promise<{ interviews: Interview[]; total: number }> {
    const skip = (page - 1) * limit;
    const interviews = await this.interviewModel
      .find({ archive: false })
      .populate('createBy')
      .populate('comments')
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.interviewModel.countDocuments();
    return { interviews, total };
  }

  async createInterview(
    createInterview: CreateInterviewDto,
  ): Promise<Interview> {
    const newInterview = new this.interviewModel(createInterview);
    return (await newInterview.save()).populate('createBy');
  }

  async editInterview(
    id: string,
    editInterview: EditInterviewDto,
  ): Promise<Interview> {
    const interview = await this.interviewModel
      .findByIdAndUpdate(id, editInterview, {
        new: true, // Return the updated document
      })
      .populate('createBy');

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    return interview;
  }

  async archiveInterview(id: string): Promise<Interview> {
    const interview = await this.interviewModel
      .findByIdAndUpdate(
        id,
        { archive: true },
        {
          new: true, // Return the updated document
        },
      )
      .populate('createBy');

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    return interview;
  }

  async addCommentToInterview(
    interviewId: string,
    addComment: AddCommentDto,
  ): Promise<Interview> {
    const interview = await this.interviewModel.findById(interviewId);

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }
    const newComment = new this.commentModel({
      content: addComment.content,
      author: addComment.anthor,
    });

    await newComment.save();

    interview.comments.push(newComment._id);
    await interview.save();

    return (await interview.populate('createBy')).populate('comments');
  }
}
