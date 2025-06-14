import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { validate as isUuid } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    if (!dto.login || !dto.password) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.createUser(dto);
  }

  @Put(':id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    if (!dto.oldPassword || !dto.newPassword) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.updateUserPassword(id, dto);
    if (user === 0) {
      throw new HttpException(
        'User not found or password mismatch',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.userService.deleteUser(id);
    if (!success) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'User deleted successfully' };
  }
}
