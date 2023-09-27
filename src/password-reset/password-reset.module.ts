import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetEntity } from './entities/passwrod-reset.entity';
import { PasswordResetController } from './password-reset.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
@Module({
  providers: [PasswordResetService],
  imports: [
    TypeOrmModule.forFeature([PasswordResetEntity, UserEntity]),
    UserModule,
  ],
  exports: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class PasswordResetModule {}
