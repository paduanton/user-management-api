import { Module } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { ProfilePhotoRepository } from './repository/profile-photo.repository';

import { UsersService } from './services/users.services';
import { HttpModule } from '@nestjs/axios';

import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import {
  ProfilePhoto,
  ProfilePhotoSchema,
} from './schemas/profile-photo.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ProfilePhoto.name,
        schema: ProfilePhotoSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersRepository, ProfilePhotoRepository, UsersService],
})
export class UsersModule {}
