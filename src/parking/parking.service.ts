import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingEntity } from './entities/parking.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { UserService } from '../user/user.service';
import { ParkingHistoryService } from '../parking-history/parking-history.service';
import { CronJob } from 'cron';
@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(ParkingEntity)
    private readonly parkingRepository: Repository<ParkingEntity>,
    private readonly userService: UserService,
    private readonly parkingHistoryService: ParkingHistoryService,
    private scheduleRegistry: SchedulerRegistry,
  ) {}

  async findById(id: string, relations: Array<string>) {
    return this.parkingRepository.findOne({ where: { id }, relations });
  }

  async findAll(relations: Array<string>) {
    return this.parkingRepository.find({ relations });
  }

  async create(parking: Partial<ParkingEntity>) {
    const parkingSpace = await this.parkingRepository.findOne({
      where: { name: parking.name },
    });

    if (parkingSpace) {
      return new HttpException(
        'Parking Space Already Exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.parkingRepository.save(parking);
  }

  async update(id: string, parking: Partial<ParkingEntity>) {
    return this.parkingRepository.update({ id }, parking);
  }

  async delete(id: string) {
    return this.parkingRepository.delete({ id });
  }

  async rentParkingSpace(parkingId: string, userEmail: string, carId: string) {
    const parkingSpace = await this.parkingRepository.findOne({
      where: { id: parkingId },
      relations: ['parkedCar', 'parkedCar.user'],
    });

    if (parkingSpace.parkedCar) {
      return new HttpException(
        'Parking Space is already rented',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.findByEmail(userEmail, ['cars']);
    if (user.balance <= 0) {
      return new HttpException('Insufficient Funds', HttpStatus.BAD_REQUEST);
    }

    const car = user.cars.find((c) => c.id === carId);
    parkingSpace.parkedCar = car;
    this.parkingRepository.update(parkingSpace.id, parkingSpace);

    this.scheduleRegistry.addCronJob(
      'chargeUser',
      new CronJob(CronExpression.EVERY_HOUR, () =>
        this.chargeUser(parkingSpace.id),
      ),
    );

    return parkingSpace;
  }

  async chargeUser(id: string) {
    const parkingSpace = await this.parkingRepository.findOne({
      where: { id },
      relations: ['parkedCar', 'parkedCar.user'],
    });

    const user = parkingSpace.parkedCar.user;
    const amount = parkingSpace.hourlyPrice;

    user.balance -= amount;

    if (user.balance < 0) {
      this.scheduleRegistry.getCronJob('chargeUser').stop();
      user.balance = 0;
      const parkingHistory = await this.parkingHistoryService.create({
        parking: parkingSpace,
        car: parkingSpace.parkedCar,
      });

      parkingSpace.parkedCar = null;
      parkingSpace.parkingHistory = parkingHistory;
      this.parkingRepository.update(parkingSpace.id, parkingSpace);
    }
    this.userService.update(user.id, user);
  }
}
