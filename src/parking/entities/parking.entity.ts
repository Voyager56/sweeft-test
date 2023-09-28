import { CarEntity } from '../../cars/entities/car.entity';
import { ParkingHistoryEntity } from '../../parking-history/entities/parking-history.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('parking')
export class ParkingEntity {
  @PrimaryGeneratedColumn('uuid')
  @Unique(['id'])
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Unique(['name'])
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'bigint' })
  hourlyPrice: number;

  @OneToOne(() => CarEntity, (car) => car.id)
  @JoinColumn()
  parkedCar: CarEntity;

  @OneToMany(() => ParkingHistoryEntity, (parkingHistory) => parkingHistory.id)
  parkingHistory: ParkingHistoryEntity[];

  static create(parking: Partial<ParkingEntity>) {
    const newParking = new ParkingEntity();
    Object.assign(newParking, parking);
    return newParking;
  }
}
