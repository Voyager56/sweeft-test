import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/car.create.dto';
import { UpdateCarDto } from './dto/car.update.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    private readonly userService: UserService,
  ) {}

  async findById(id: string): Promise<CarEntity> {
    return await this.carRepository.findOne({ where: { id } });
  }

  async create(carDto: CreateCarDto, userId: string): Promise<CarEntity> {
    const user = await this.userService.findById(userId, []);
    const car = this.carRepository.create({
      ...carDto,
      user: user,
    });
    return await this.carRepository.save(car);
  }

  async getAll(userId: string): Promise<CarEntity[]> {
    const user = await this.userService.findById(userId, ['cars']);
    return user.cars;
  }

  async update(userId: string, carDto: UpdateCarDto): Promise<CarEntity> {
    const user = await this.userService.findById(userId, ['cars']);
    const car = user.cars.find((c) => (c.id = carDto.id));
    if (!car) {
      new HttpException('Car Does Not Exist', HttpStatus.BAD_REQUEST);
    }
    await this.carRepository.update(car.id, CarEntity.create(carDto));
    return this.findById(car.id);
  }

  async delete(userId: string, carId: string) {
    const user = await this.userService.findById(userId, ['cars']);
    const car = user.cars.find((c) => (c.id = carId));
    if (!car) {
      new HttpException('Car Does Not Exist', HttpStatus.BAD_REQUEST);
    }
    await this.carRepository.delete(car.id);
    return 'Car Deleted Successfuly';
  }
}
