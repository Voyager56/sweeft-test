import { CarEntity } from '../../cars/entities/car.entity';
import { ParkingEntity } from '../../parking/entities/parking.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity('parking-history')
export class ParkingHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  @Unique(['id'])
  id: string;

  @ManyToOne(() => ParkingEntity, (parking) => parking.id)
  parking: ParkingEntity;

  @ManyToOne(() => CarEntity, (car) => car.id)
  car: CarEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
