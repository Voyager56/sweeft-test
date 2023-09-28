import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../enums/user.role';
import { CarEntity } from '../../cars/entities/car.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Unique(['name'])
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @Unique(['email'])
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @Column({ type: 'float', default: 100 })
  balance: number;

  @OneToMany(() => CarEntity, (car) => car.user)
  cars: CarEntity[];

  static create(user: Partial<UserEntity>) {
    const newUser = new UserEntity();
    Object.assign(newUser, user);
    return newUser;
  }
}
