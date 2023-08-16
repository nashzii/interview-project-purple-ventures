import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { TodoStatus } from '../interview.schema';
export class EditInterviewDto {
  @IsNotEmpty()
  @IsString()
  interviewName: string;

  @IsString()
  description: string;

  @IsEnum(TodoStatus)
  status: string;
}
