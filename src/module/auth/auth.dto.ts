import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ROLE } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(ROLE)
  role: ROLE.user;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
