import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(
    email: string,
    relations: Array<string> = [],
  ): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email }, relations });
  }

  async findById(id: string, relations: Array<string>): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id }, relations });
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.save(UserEntity.create(user));
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return await this.findById(id, []);
  }

  async delete(id: string): Promise<string> {
    const user = await this.findById(id, []);
    await this.userRepository.delete(id);
    return 'User Deleted Successfuly';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async updatePassword(
    user: UserEntity,
    password: string,
  ): Promise<UserEntity> {
    user.password = bcrypt.hashSync(password, 10);
    await this.update(user.id, user);
    return user;
  }

  async createAdminUser() {
    this.userRepository.save(UserEntity.createAdminUser());
  }
}
