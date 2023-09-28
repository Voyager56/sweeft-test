import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { PasswordResetEntity } from './password-reset/entities/passwrod-reset.entity';
import { CarsModule } from './cars/cars.module';
import { CarEntity } from './cars/entities/car.entity';
import { ParkingModule } from './parking/parking.module';
import { ParkingEntity } from './parking/entities/parking.entity';
import { ParkingHistoryModule } from './parking-history/parking-history.module';
import { ParkingHistoryEntity } from './parking-history/entities/parking-history.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
          UserEntity,
          PasswordResetEntity,
          CarEntity,
          ParkingEntity,
          ParkingHistoryEntity,
        ],
        synchronize: true,
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    PasswordResetModule,
    CarsModule,
    ParkingModule,
    ParkingHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
