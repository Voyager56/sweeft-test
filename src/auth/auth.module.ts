import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PasswordResetEntity } from 'src/password-reset/entities/passwrod-reset.entity';
import { PasswordResetModule } from 'src/password-reset/password-reset.module';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, PasswordResetEntity]),
    UserModule,
    PasswordResetModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
