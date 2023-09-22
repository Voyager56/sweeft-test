import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}