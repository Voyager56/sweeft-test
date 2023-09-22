import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetEntity } from './entities/passwrod-reset.entity';
@Module({
  providers: [PasswordResetService],
  imports: [TypeOrmModule.forFeature([PasswordResetEntity])],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
