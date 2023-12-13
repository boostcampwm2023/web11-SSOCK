import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ip } from './ip.schema';

@Injectable()
export class IpService {
  constructor(@InjectModel(Ip.name) private readonly ipModel: Model<Ip>) {}

  async logIp(ip: string, message_id: number): Promise<Ip> {
    const createdIp = new this.ipModel({ ip, message_id });
    return createdIp.save();
  }
}
