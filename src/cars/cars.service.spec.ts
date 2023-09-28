import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { UserService } from '../user/user.service';
import { CarEntity } from './entities/car.entity';
import { CarType } from './enums/car-types.enum';
import { HttpException } from '@nestjs/common';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        UserService,
        {
          provide: 'CarEntityRepository',
          useValue: {
            findOne: jest.fn(({ where: { id } }) => {
              if (id === '1') {
                return {
                  id: '1',
                  carType: CarType.Suv,
                  licensePlate: 'licensePlate',
                  name: 'name',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  currentParking: null,
                  parkingHistory: [],
                  user: null,
                } as CarEntity;
              }
              return null;
            }),
            create: jest.fn((car) => {
              return {
                id: '1',
                carType: CarType.Suv,
                licensePlate: 'licensePlate',
                name: 'name',
                createdAt: new Date(),
                updatedAt: new Date(),
                currentParking: null,
                parkingHistory: [],
                user: null,
              } as CarEntity;
            }),
            save: jest.fn((car) => {
              return {
                id: '1',
                carType: CarType.Suv,
                licensePlate: 'licensePlate',
                name: 'name',
                createdAt: new Date(),
                updatedAt: new Date(),
                currentParking: null,
                parkingHistory: [],
                user: null,
              } as CarEntity;
            }),
            delete: jest.fn((id) => {
              return null;
            }),
            update: jest.fn((id, car) => {
              return {
                id: '1',
                carType: CarType.Suv,
                licensePlate: 'licensePlate',
                name: 'name',
                createdAt: new Date(),
                updatedAt: new Date(),
                currentParking: null,
                parkingHistory: [],
                user: null,
              } as CarEntity;
            }),
          },
        },
        {
          provide: 'UserEntityRepository',
          useValue: {
            findOne: jest.fn(({ where: { email } }) => {
              if (email === 'email') {
                return {
                  id: 1,
                  email: 'email',
                  password: 'password',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  cars: [
                    {
                      id: '1',
                      carType: CarType.Suv,
                      licensePlate: 'licensePlate',
                      name: 'name',
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      currentParking: null,
                      parkingHistory: [],
                      user: null,
                    },
                  ],
                };
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a car', async () => {
    const car = await service.findById('1');
    expect(car).toBeDefined();
    expect(car).toBeInstanceOf(Object);
  });

  it('should create a car', async () => {
    const car = await service.create(
      {
        name: 'name',
        carType: CarType.Suv,
        licensePlate: 'licensePlate',
      },
      'email',
    );
    expect(car).toBeDefined();
    expect(car).toBeInstanceOf(Object);
  });

  it('should get all cars', async () => {
    const cars = await service.getAll('email');
    expect(cars).toBeDefined();
    expect(cars).toBeInstanceOf(Array);
  });

  it('should update a car', async () => {
    const car = await service.update(
      'email',
      {
        name: 'name',
        carType: CarType.Suv,
        licensePlate: 'licensePlate',
      },
      '1',
    );
    expect(car).toBeDefined();
    expect(car).toBeInstanceOf(Object);
  });

  it('should delete a car', async () => {
    const car = await service.delete('email', '1');
    expect(car).toBeDefined();
    expect(car).toEqual('Car Deleted Successfuly');
  });

  it('should not find a car', async () => {
    const car = await service.findById('2');
    expect(car).toBeNull();
  });

  it('should not create a car', async () => {
    try {
      const car = await service.create(
        {
          name: 'name',
          carType: CarType.Suv,
          licensePlate: 'licensePlate',
        },
        'email2',
      );
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });

  it('should not get all cars', async () => {
    try {
      const cars = await service.getAll('email2');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });

  it('should not update a car', async () => {
    try {
      const car = await service.update(
        'email2',
        {
          name: 'name',
          carType: CarType.Suv,
          licensePlate: 'licensePlate',
        },
        '1',
      );
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  it('should not delete a car', async () => {
    try {
      const car = await service.delete('email2', '1');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });
});
