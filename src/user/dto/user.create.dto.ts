import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
