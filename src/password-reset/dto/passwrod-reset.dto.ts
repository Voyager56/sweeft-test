import { IsNotEmpty, MinLength } from 'class-validator';
import { Match } from 'src/validation-rules/passwords-match';

export class PasswordResetDto {
  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  token: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  @Match('password')
  repeatPassword: string;
}
