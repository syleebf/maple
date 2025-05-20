import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from './entities/reward.entity';
import { RequestRewardDto } from './dto/request-reward.dto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepo: MongoRepository<Reward>,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = this.rewardRepo.create(createRewardDto);
    return await this.rewardRepo.save(reward);
  }

  async requestReward(requestRewardDto:RequestRewardDto): Promise<Reward> {
      const isDuplicate = await this.rewardRepo.exist({
    where: {
      eventId: requestRewardDto.eventId,
      userId: requestRewardDto.userId,
    },
  });
    if (isDuplicate) {
    throw new ConflictException('이미 해당 사용자와 이벤트에 대한 보상이 존재합니다.');
  }

    const reward = this.rewardRepo.create(requestRewardDto);
    return await this.rewardRepo.save(reward);
  }

  async findAll(): Promise<Reward[]> {
    return await this.rewardRepo.find();
  }

  async requestRewardList(id: string) {
    //userid
    return await this.rewardRepo.find({where: id});
  }

}
