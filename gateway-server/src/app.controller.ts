import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/role.enum';
import { Req } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  
  // 회원가입
  @Post('users/signup')
  async signupUser(@Body() body: any) {
    const url = `${this.configService.get('AUTH_SERVICE_URL')}/users/signup`;
    const response = await firstValueFrom(
      this.httpService.post(url, body),
    );
    return response.data;
  }

  // 로그인
  @Post('users/login')
  async loginUser(@Body() body: any) {
    const url = `${this.configService.get('AUTH_SERVICE_URL')}/users/login`;
    const response = await firstValueFrom(
      this.httpService.post(url, body),
    );
    return response.data;
  }

  // 유저 본인 정보 조회
  @UseGuards(JwtAuthGuard)
  @Get('users/:username')
  async getUser(@Param('username') username: string, @Req() req: Request) {
    const url = `${this.configService.get('AUTH_SERVICE_URL')}/users/${username}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: req.headers['authorization'] },
      }),
    );
    return response.data;
  }

  // 이벤트 생성
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Operator)
  @Post('event/create')
  async createEvent(@Body() body: any, @Req() req: Request) {
    const url = `${this.configService.get('EVENT_SERVICE_URL')}/event/create`;
    const response = await firstValueFrom(
      this.httpService.post(url, body, {
        headers: { Authorization: req.headers['authorization'] },
      }),
    );
    return response.data;
  }

  // 진행 중인 이벤트 목록 조회
  @UseGuards(JwtAuthGuard)
  @Get('event/list')
  async eventList(@Req() req: Request) {
    const url = `${this.configService.get('EVENT_SERVICE_URL')}/event/list`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: req.headers['authorization'] },
      }),
    );
    return response.data;
  }

  // 이벤트 상세 조회
  @UseGuards(JwtAuthGuard)
  @Get('event/:id')
  async eventDetail(@Param() eventId: String, @Req() req: Request) {
    const url = `${this.configService.get('EVENT_SERVICE_URL')}/event/${eventId}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: req.headers['authorization'] },
      }),
    );
    return response.data;
  }

  // 보상 설정
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Operator)
  @Post('reward/create')
    async rewardCreate(@Body() body: any, @Req() req: Request) {
    const url = `${this.configService.get('EVENT_SERVICE_URL')}/reward/create`;
    const response = await firstValueFrom(
      this.httpService.post(url, body, {
        headers: { Authorization: req.headers['authorization'] },
      }),
    );
    return response.data;
  }

  // 보상 요청 내역 조회(관리자)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Auditor)
  @Get('reward/total')
    async rewardTotal(@Req() req: Request) {
    const url = `${this.configService.get('EVENT_SERVICE_URL')}/reward/total`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: req.headers['authorization'] },
      }),
    );
    return response.data;
  }

  // 보상 요청 내역 조회(유저)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.User)
  @Get('reward:id')
    async rewardUser(@Param() userId: String, @Req() req: Request) {
    const url = `${this.configService.get('EVENT_SERVICE_URL')}/reward/${userId}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: req.headers['authorization'] },
      }),
    );
    return response.data;
  }

  // 유저 보상 신청
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.User)
  @Post('reward/request')
  async rewardRequest(@Body() body: any, @Req() req: Request) {
    const url = `${this.configService.get('EVENT_SERVICE_URL')}/reward/request`;
    const response = await firstValueFrom(
      this.httpService.post(url, body, {
        headers: { Authorization: req.headers['authorization'] },
      }),
    );
    return response.data;
  }
}
