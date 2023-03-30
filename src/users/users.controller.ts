import {
  Get,
  Post,
  Body,
  Param,
  Controller,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersRepository } from './repository/users.repository';
import { AvatarRepository } from './repository/avatar.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UsersService } from './services/users.services';
import { Express } from 'express';
import * as fs from 'fs';
import * as https from 'https';

@Controller('api/user')
export class UsersController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private userService: UsersService,
    private avatarRepository: AvatarRepository,
  ) {}

  @Get()
  findAll() {
    return this.usersRepository.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  @Post(':id/photo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static',
        filename: (request, file, callback) => {
          const { id: userId } = request.params;

          const mimeTypeInfo = file.mimetype.split('/');
          const imageExtension = mimeTypeInfo[mimeTypeInfo.length - 1];

          callback(null, `${userId}.${imageExtension}`);
        },
      }),
      fileFilter: (request, file, callback) => {
        const imageFileRegex = /\.(jpg|jpeg|png|gif)$/;
        const isImage = file.originalname.match(imageFileRegex);

        if (!isImage) {
          return callback(new Error('Only image files are allowed!'), false);
        }

        callback(null, true);
      },
    }),
  )
  uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatar: CreateAvatarDto = {
      user_id: id,
      file_name: file.filename,
      file_system_path: file.path,
    };
    return this.avatarRepository.create(avatar);
  }

  @Get(':id/photo')
  async findAvatar(@Param('id') id: number, @Response() response) {
    const avatar = await this.avatarRepository.findOneByUserId(id);

    if (avatar) {
      return response.sendFile(avatar.file_name, { root: './static' });
    }

    return response.sendFile('default-profile-photo.jpg', { root: './static' });
  }
}
