import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CarType } from '../enums/car-types.enum';
import { UserEntity } from '../../user/entities/user.entity';
import { ParkingEntity } from 'src/parking/entities/parking.entity';
import { ParkingHistoryEntity } from 'src/parking-history/entities/parking-history.entity';
@Entity('car')
export class CarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: CarType })
  carType: CarType;

  @Column({ type: 'varchar', length: 255 })
  licensePlate: string;

  @ManyToOne(() => UserEntity, (user) => user.cars, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: UserEntity;

  @OneToOne(() => ParkingEntity, (parking) => parking.id)
  currentParking: ParkingEntity;

  @OneToMany(() => ParkingHistoryEntity, (parkingHistory) => parkingHistory.id)
  parkingHistory: ParkingHistoryEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  static create(car: Partial<CarEntity>) {
    const newCar = new CarEntity();
    Object.assign(newCar, car);
    return newCar;
  }
}
