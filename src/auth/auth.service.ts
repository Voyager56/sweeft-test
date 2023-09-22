import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { PasswordResetService } from 'src/password-reset/password-reset.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserPasswordResetRequest(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const passwordReset = await this.passwordResetService.createResetToken(
      user.email,
    );
    if (user && passwordReset) {
      return passwordReset;
    }
  }

  async validateUserPasswordReset(email: string, token: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const passwordReset = await this.passwordResetService.validateResetToken(
      token,
    );
    if (
      user &&
      passwordReset &&
      passwordReset.user.id === user.id &&
      passwordReset.token === token
    ) {
      return user;
    }
    return null;
  }
}
