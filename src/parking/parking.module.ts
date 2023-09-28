import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingEntity } from './entities/parking.entity';
import { UserModule } from '..//user/user.module';
import { ParkingHistoryModule } from 'src/parking-history/parking-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingEntity]),
    UserModule,
    ParkingHistoryModule,
  ],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
