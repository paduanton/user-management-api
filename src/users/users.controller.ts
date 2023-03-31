import {
  Get,
  Post,
  Body,
  Param,
  Controller,
  Response,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersRepository } from './repository/users.repository';
import { ProfilePhotoRepository } from './repository/profile-photo.repository';
import { UserDto } from './dto/user.dto';
import { CreateProfilePhotoDto } from './dto/profile-photo.dto';
import { Express, Request } from 'express';

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
          request.fileValidationErrorMessage = 'Only image files are allowed!';
          request.fileValidationError = true;
        } else {
          request.fileValidationErrorMessage = '';
          request.fileValidationError = false;
        }

        callback(null, true);
      },
    }),
  )
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
    @Response() response
  ) {
    console.log("aqui")
    if(request?.fileValidationError) {
      return response.status(400).send(
        {
          message: [request.fileValidationErrorMessage]
        });
    }

    const profilePhoto: CreateProfilePhotoDto = {
      user_id: id,
      file_name: file.filename,
      file_system_path: file.path,
    };
    await this.profilePhotoRepository.create(profilePhoto);

    return response.status(201).send(profilePhoto)
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
