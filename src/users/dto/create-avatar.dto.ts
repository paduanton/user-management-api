import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAvatarDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  file_name: string;

  @IsString()
  @IsNotEmpty()
  file_system_path: string;
}
