import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CarType } from './enums/car-types.enum';

describe('CarsController', () => {
  let controller: CarsController;

  const mockCarService = {
    getAll: jest.fn((email) => {
      if (email === 'email') {
        return [
          {
            id: 1,
            model: 'model',
            brand: 'brand',
            year: 2021,
            color: 'color',
            monthlyPrice: 100,
            availableDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            user: {
              id: 1,
              email: 'email',
              password: 'password',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        ];
      }
      return [];
    }),

    create: jest.fn((car, email) => {
      if (email === 'email') {
        return {
          id: 1,
          model: 'model',
          brand: 'brand',
          year: 2021,
          color: 'color',
          monthlyPrice: 100,
          availableDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: 1,
            email: 'email',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      }
      return null;
    }),

    delete: jest.fn((email, id) => {
      if (email === 'email' && id === '1') {
        return {
          id: 1,
          model: 'model',
          brand: 'brand',
          year: 2021,
          color: 'color',
          monthlyPrice: 100,
          availableDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: 1,
            email: 'email',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      }
      return null;
    }),

    update: jest.fn((email, car, id) => {
      if (email === 'email' && id === '1') {
        return {
          id: 1,
          model: 'model',
          brand: 'brand',
          year: 2021,
          color: 'color',
          monthlyPrice: 100,
          availableDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: 1,
            email: 'email',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        CarsService,
        UserService,
        {
          provide: 'CarEntityRepository',
          useValue: {},
        },
        {
          provide: 'UserEntityRepository',
          useValue: {},
        },
      ],
    })
      .overrideProvider(CarsService)
      .useValue(mockCarService)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all cars', () => {
    expect(controller.getAll({ user: { email: 'email' } })).toBeDefined();
  });

  it('should create a car', () => {
    expect(
      controller.create(
        { user: { email: 'email' } },
        { name: 'name', carType: CarType.Suv, licensePlate: 'licensePlate' },
      ),
    ).toBeDefined();
  });

  it('should delete a car', () => {
    expect(controller.delete({ user: { email: 'email' } }, '1')).toBeDefined();
  });

  it('should update a car', () => {
    expect(
      controller.update(
        { user: { email: 'email' } },
        { name: 'name', carType: CarType.Suv, licensePlate: 'licensePlate' },
        '1',
      ),
    ).toBeDefined();
  });

  it('should not return all cars', () => {
    expect(controller.getAll({ user: { email: 'email2' } })).toEqual([]);
  });

  it('should not create a car', () => {
    expect(
      controller.create(
        { user: { email: 'email2' } },
        { name: 'name', carType: CarType.Suv, licensePlate: 'licensePlate' },
      ),
    ).toBeNull();
  });

  it('should not delete a car', () => {
    expect(controller.delete({ user: { email: 'email2' } }, '1')).toBeNull();
  });

  it('should not update a car', () => {
    expect(
      controller.update(
        { user: { email: 'email2' } },
        { name: 'name', carType: CarType.Suv, licensePlate: 'licensePlate' },
        '1',
      ),
    ).toBeNull();
  });
});
