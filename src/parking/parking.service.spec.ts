import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from './parking.service';
import { UserService } from '../user/user.service';
import { ParkingHistoryService } from '../parking-history/parking-history.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ParkingEntity } from './entities/parking.entity';

describe('ParkingService', () => {
  let service: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingService,
        UserService,
        ParkingHistoryService,
        SchedulerRegistry,
        ParkingEntity,
      ],
    }).compile();

    service = module.get<ParkingService>(ParkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
