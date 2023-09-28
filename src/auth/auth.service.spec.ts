import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt.guard';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: 'UserEntityRepository',
          useValue: {},
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .overrideProvider(JwtService)
      .useValue({
        sign: jest.fn((email, id) => {
          if (email === 'email@email.com')
            return {
              email,
              id,
            };
          return null;
        }),
      })
      .overrideProvider(UserService)
      .useValue({
        findByEmail: jest.fn((email) => {
          if (email === 'email@email.com') {
            return {
              email,
              id: 1,
              password: 'password',
            };
          }
          return null;
        }),
      })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user', async () => {
    const user = {
      email: 'email@gmail.com',
      password: 'password',
    };
    const result = await service.validateUser(user.email, user.password);
    expect(result).toBeDefined();
  });

  it('should not validate user', async () => {
    const user = {
      email: '',
      password: '',
    };
    const result = await service.validateUser(user.email, user.password);
    expect(result).toBeNull();
  });

  it('should login user', async () => {
    const user = {
      email: 'email@gmail.com',
      id: 1,
    };

    const result = await service.login(user);
    expect(result.access_token).toBeDefined();
  });

  it('should not login user', async () => {
    const user = {
      email: '',
      id: 1,
    };

    const result = await service.login(user);
    expect(result.access_token).toBeNull();
  });
});
