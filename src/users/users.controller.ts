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
import { ProfilePhotoRepository } from './repository/profile-photo.repository';
import { UserDto } from './dto/user.dto';
import { CreateProfilePhotoDto } from './dto/profile-photo.dto';
import { Express } from 'express';

@Controller('api/v1/user')
export class UsersController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private profilePhotoRepository: ProfilePhotoRepository,
  ) {}

  @Get()
  findAll() {
    return this.usersRepository.findAll();
  }

  @Post()
  create(@Body() createUserDto: UserDto) {
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
    const profilePhoto: CreateProfilePhotoDto = {
      user_id: id,
      file_name: file.filename,
      file_system_path: file.path,
    };
    return this.profilePhotoRepository.create(profilePhoto);
  }

  @Get(':id/photo')
  async findProfilePhoto(@Param('id') id: number, @Response() response) {
    const profilePhoto = await this.profilePhotoRepository.findOneByUserId(id);

    if (profilePhoto) {
      return response.sendFile(profilePhoto.file_name, { root: './static' });
    }

    return response.sendFile('default-profile-photo.jpg', { root: './static' });
  }
}
