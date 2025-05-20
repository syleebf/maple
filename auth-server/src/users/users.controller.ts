import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 회원가입
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto.username, dto.password, dto.role);
  }

  // 유저 본인 정보 조회
  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
  
}
