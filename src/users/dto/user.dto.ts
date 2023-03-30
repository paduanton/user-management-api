import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDateString,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  last_name: string;

  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(150)
  street: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  state: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  job_title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  phone_number: string;
}
