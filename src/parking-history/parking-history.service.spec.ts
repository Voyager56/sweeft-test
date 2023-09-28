import { Test, TestingModule } from '@nestjs/testing';
import { ParkingHistoryService } from './parking-history.service';
import { ParkingHistoryEntity } from './entities/parking-history.entity';

describe('ParkingHistoryService', () => {
  let service: ParkingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingHistoryService,
        ParkingHistoryEntity,
        ParkingHistoryEntity,
      ],
    }).compile();

    service = module.get<ParkingHistoryService>(ParkingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
