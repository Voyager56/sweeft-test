import { Module } from '@nestjs/common';
import { ParkingHistoryService } from './parking-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingHistoryEntity } from './entities/parking-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingHistoryEntity])],
  providers: [ParkingHistoryService],
  exports: [ParkingHistoryService],
})
export class ParkingHistoryModule {}
