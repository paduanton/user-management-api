import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAvatarDto } from '../dto/create-avatar.dto';
import { Avatar, AvatarDocument } from '../schemas/avatar.schema';

@Injectable()
export class AvatarRepository {
  constructor(
    @InjectModel(Avatar.name)
    private readonly avatarModel: Model<AvatarDocument>,
  ) {}

  async create(createAvatarDto: CreateAvatarDto): Promise<AvatarDocument> {
    const avatar = new this.avatarModel(createAvatarDto);
    return avatar.save();
  }

  findOneByUserId(userId: number) {
    return this.avatarModel.findOne({ user_id: userId });
  }
}
