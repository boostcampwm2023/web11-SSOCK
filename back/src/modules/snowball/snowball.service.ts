import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnowballEntity } from './entity/snowball.entity';
import { CreateSnowballDto } from './dto/req-create-snowball.dto';
import { UpdateSnowballDto } from './dto/req-update-snowball.dto';

@Injectable()
export class SnowballService {
  constructor(
    @InjectRepository(SnowballEntity)
    private readonly snowballRepository: Repository<SnowballEntity>
  ) {}
  async createSnowball(
    createSnowballDto: CreateSnowballDto
  ): Promise<SnowballEntity> {
    const snowball = this.snowballRepository.create(createSnowballDto);
    return await this.snowballRepository.save(snowball);
  }
  async updateSnowball(updateSnowballDto: UpdateSnowballDto): Promise<void> {
    await this.snowballRepository.delete(updateSnowballDto.snowball_uuid);
  }
}
