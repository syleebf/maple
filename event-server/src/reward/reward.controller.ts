import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RequestRewardDto } from './dto/request-reward.dto';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('create')
  async rewardCreate(@Body() createRewardDto: CreateRewardDto) {
    return await this.rewardService.create(createRewardDto);
  }

  @Post('request')
  async requestReward(@Body() requestRewardDto: RequestRewardDto) {
    return await this.rewardService.requestReward(requestRewardDto);
  }

  @Get('total')
  async totalRewardList() {
    return await this.rewardService.findAll();
  }

  @Get(':id')
  async requestRewardList(@Param('id') id: string) {
     return this.rewardService.requestRewardList(id);
  }

  @Get()
  findAll() {
    return this.rewardService.findAll();
  }

}
