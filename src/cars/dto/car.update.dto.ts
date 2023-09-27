import { IsEnum, MinLength, IsNotEmpty } from 'class-validator';
import { CarType } from '../enums/car-types.enum';

export class UpdateCarDto {
  @IsNotEmpty()
  id: string;

  @MinLength(3)
  name: string;

  @IsEnum(CarType)
  carType: CarType;

  @MinLength(3)
  licensePlate: string;
}
