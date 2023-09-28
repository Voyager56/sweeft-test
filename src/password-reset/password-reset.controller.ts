import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetDto } from './dto/passwrod-reset.dto';

@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly userService: UserService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  @Post('/create')
  async validateUserPasswordResetRequest(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    // check if user has an existing password reset token

    const passwordReset = await this.passwordResetService.createResetToken(
      user.email,
    );
    if (user && passwordReset) {
      return passwordReset;
    }
  }

  @UsePipes(ValidationPipe)
  @Post('/validate')
  async validateUserPasswordReset(
    @Body()
    passwordresetDto: PasswordResetDto,
  ): Promise<any> {
    const user = await this.userService.findByEmail(passwordresetDto.email);
    const passwordReset = await this.passwordResetService.validateResetToken(
      passwordresetDto.token,
    );
    if (user && passwordReset) {
      await this.userService.updatePassword(user, passwordresetDto.password);
      await this.passwordResetService.deleteToken(passwordReset.id);
      return { message: 'Password reset successful' };
    }
  }
}
