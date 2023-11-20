import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnowballEntity } from './entity/snowball.entity';
import { ReqCreateSnowballDto } from './dto/request/req-create-snowball.dto';
import { ReqUpdateSnowballDto } from './dto/request/req-update-snowball.dto';

@Injectable()
export class SnowballService {
  constructor(
    @InjectRepository(SnowballEntity)
    private readonly snowballRepository: Repository<SnowballEntity>
  ) {}
  async createSnowball(
    createSnowballDto: ReqCreateSnowballDto
  ): Promise<SnowballEntity> {
    const snowball = this.snowballRepository.create(createSnowballDto);
    return await this.snowballRepository.save(snowball);
  }
  async updateSnowball(updateSnowballDto: ReqUpdateSnowballDto): Promise<void> {
    await this.snowballRepository.delete(updateSnowballDto.snowball_id);
  }
}
