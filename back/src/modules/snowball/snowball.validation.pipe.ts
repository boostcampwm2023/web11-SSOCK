import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { SnowballService } from './snowball.service';

@Injectable()
export class SnowballValidationPipe implements PipeTransform {
  constructor(private readonly snowballService: SnowballService) {}

  async transform(id: any): Promise<any> {
    const snowball = await this.snowballService.isValidSnowball(id);

    if (!snowball) {
      throw new NotFoundException('Snowball not found');
    }

    return id;
  }
}
