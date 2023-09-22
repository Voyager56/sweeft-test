import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Unique,
} from 'typeorm';

@Entity('password-reset-table')
export class PasswordResetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Unique(['email'])
  email: string;

  @Column({ type: 'varchar', length: 255 })
  token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expirationDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  static create(passwordReset: Partial<PasswordResetEntity>) {
    const newPasswrodReset = new PasswordResetEntity();
    Object.assign(newPasswrodReset, passwordReset);
    return newPasswrodReset;
  }
}
