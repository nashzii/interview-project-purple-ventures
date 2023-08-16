import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    return await this.userService.createUser(createUserDto);
  }

  //TODO Edit user

  //TODO Delete user
}
