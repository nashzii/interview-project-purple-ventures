import { IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { TodoStatus } from '../interview.schema';
export class CreateInterviewDto {
  @IsNotEmpty()
  @IsString()
  interviewName: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status: string;

  @IsNotEmpty()
  createBy: string;
}
