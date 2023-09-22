import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../enums/user.role';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
