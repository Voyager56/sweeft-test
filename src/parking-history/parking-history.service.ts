import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingHistoryEntity } from './entities/parking-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingHistoryService {
  constructor(
    @InjectRepository(ParkingHistoryEntity)
    private readonly parkingHistoryRepository: Repository<ParkingHistoryEntity>,
  ) {}

  async findById(id: string, relations: Array<string>) {
    return this.parkingHistoryRepository.findOne({ where: { id }, relations });
  }

  async findAll(relations: Array<string>) {
    return this.parkingHistoryRepository.find({ relations });
  }

  async create(parkingHistory: Partial<ParkingHistoryEntity>) {
    const p = await this.parkingHistoryRepository.save(parkingHistory);
    return this.parkingHistoryRepository.find({ where: { id: p.id } });
  }
}
