import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfilePhotoDto } from '../dto/profile-photo.dto';
import {
  ProfilePhoto,
  ProfilePhotoDocument,
} from '../schemas/profile-photo.schema';

@Injectable()
export class ProfilePhotoRepository {
  constructor(
    @InjectModel(ProfilePhoto.name)
    private readonly profilePhotoModel: Model<ProfilePhotoDocument>,
  ) {}

  async create(
    createProfilePhotoDto: CreateProfilePhotoDto,
  ): Promise<ProfilePhotoDocument> {
    const profilePhoto = new this.profilePhotoModel(createProfilePhotoDto);
    return profilePhoto.save();
  }

  findOneByUserId(userId: number) {
    return this.profilePhotoModel.findOne({ user_id: userId });
  }
}
