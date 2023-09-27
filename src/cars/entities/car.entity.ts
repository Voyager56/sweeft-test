import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CarType } from '../enums/car-types.enum';
import { UserEntity } from 'src/user/entities/user.entity';
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

  @ManyToOne(() => UserEntity, (user) => user.cars)
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
