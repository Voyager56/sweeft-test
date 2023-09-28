import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { CarEntity } from '../cars/entities/car.entity';
import { NestApplicationContext, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity, CarEntity])],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
