import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('parking')
export class ParkingEntity {
  @PrimaryGeneratedColumn('uuid')
  @Unique(['id'])
  id: string;

  @Column({ type: 'varchar', length: 255 })
  adress: string;

  @Column({ type: 'int64' })
  hourlyPrice: number;

  static create(parking: Partial<ParkingEntity>) {
    const newParking = new ParkingEntity();
    Object.assign(newParking, parking);
    return newParking;
  }
}
