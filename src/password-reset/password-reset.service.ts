import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordResetEntity } from './entities/passwrod-reset.entity';
import * as crypto from 'crypto';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepository: Repository<PasswordResetEntity>,
  ) {}

  public async createResetToken(email: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const timeOutMinutes = parseInt(process.env.PASSWORD_RESET_TIMEOUT);
    const expires_at = new Date(Date.now() + 1000 * 60 * timeOutMinutes);
    const passwordReset = PasswordResetEntity.create({
      email,
      token,
      expirationDate: expires_at,
    });
    return this.passwordResetRepository.save(passwordReset);
  }

  public async validateResetToken(token: string): Promise<any> {
    const tokenField = await this.passwordResetRepository.findOne({
      where: { token },
    });

    if (!tokenField) {
      return new Error('Invalid token');
    }

    // check if token is expired
    if (tokenField.expirationDate < new Date()) {
      return new Error('Token expired');
    }

    return tokenField;
  }
}
