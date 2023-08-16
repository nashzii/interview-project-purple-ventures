import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview';
import { Interview } from './interview.schema';
import { EditInterviewDto } from './dto/edit-interview';
import { AddCommentDto } from 'src/comment/dto/add-comment';
import { PaginationDto } from './dto/pagination-interview';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}
  @Get()
  async getInterview(@Query() paginationDto: PaginationDto) {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const { interviews, total } = await this.interviewService.getInterview(
      page,
      limit,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      interviews,
      total,
      totalPages,
    };
  }

  @Post()
  async createInterview(
    @Body() createInterview: CreateInterviewDto,
  ): Promise<Interview> {
    return await this.interviewService.createInterview(createInterview);
  }

  @Patch(':interviewId')
  async editInterview(
    @Param('interviewId') interviewId: string,
    @Body() editInterview: EditInterviewDto,
  ) {
    try {
      const interview = await this.interviewService.editInterview(
        interviewId,
        editInterview,
      );
      return interview;
    } catch (error) {
      return {
        statusCode: 404,
        message: error.message,
      };
    }
  }

  @Post('archive/:interviewId')
  async archiveInterview(@Param('interviewId') interviewId: string) {
    try {
      const interview =
        await this.interviewService.archiveInterview(interviewId);
      return interview;
    } catch (error) {
      return {
        statusCode: 404,
        message: error.message,
      };
    }
  }

  @Post('addcomment/:interviewId')
  async AddCommand(
    @Param('interviewId') interviewId: string,
    @Body() addComment: AddCommentDto,
  ) {
    return await this.interviewService.addCommentToInterview(
      interviewId,
      addComment,
    );
  }
}
