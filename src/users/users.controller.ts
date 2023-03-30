import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
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
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('id', id);
    console.log('file', file);
  }

  @Get(':id/avatar')
  async findAvatar(@Param('id') id: number) {
    const avatar = await this.avatarRepository.findOneByUserId(id);

    if (!avatar?.user_id) {
      const user = await this.userService.getUser(id).toPromise();
      const imagePath = `./static/${user.id}.jpg`;

      await this._download(user.avatar, imagePath);

      const base64Image = fs.readFileSync(imagePath, 'base64');
      const parsedBase64Image = `data:image/jpg;base64,${base64Image}`;

      const avatar: CreateAvatarDto = {
        file_system_path: imagePath,
        user_id: user.id,
        hash: parsedBase64Image,
      };
      return this.avatarRepository.create(avatar);
    }

    return avatar;
  }

  @Delete(':id/avatar')
  async remove(@Param('id') id: number) {
    const avatar = await this.avatarRepository.findOneByUserId(id);

    fs.unlinkSync(avatar.file_system_path);

    return this.avatarRepository.removeByUserId(id);
  }
  // TODO - Create helper layer to export functions like this
  private async _download(url, filePath) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(filePath);
      let fileInfo = null;

      const request = https.get(url, (response) => {
        if (response.statusCode !== 200) {
          fs.unlink(filePath, () => {
            reject(
              new Error(`Failed to get '${url}' (${response.statusCode})`),
            );
          });
          return;
        }

        fileInfo = {
          mime: response.headers['content-type'],
          size: parseInt(response.headers['content-length'], 10),
        };

        response.pipe(file);
      });

      file.on('finish', () => resolve(fileInfo));

      request.on('error', (err) => {
        fs.unlink(filePath, () => reject(err));
      });

      file.on('error', (err) => {
        fs.unlink(filePath, () => reject(err));
      });

      request.end();
    });
  }
}
