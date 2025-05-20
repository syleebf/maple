import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: MongoRepository<User>,
  ) {}

  async createUser(username: string, plainPassword: string, role: string) {
    const existing = await this.userRepo.findOne({ where: { username } });
    if (existing) throw new ConflictException('이미 존재하는 사용자입니다.');

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(plainPassword, salt);

    const checkRole = role ?? 'user';
    const user = this.userRepo.create({ username, password: hashed, role: checkRole });
    return this.userRepo.save(user);
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
}
