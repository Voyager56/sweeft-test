import { IsEnum, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { CarType } from '../enums/car-types.enum';
import { Exclude } from 'class-transformer';

export class UpdateCarDto {
  @MinLength(3)
  name: string;

  @IsEnum(CarType)
  carType: CarType;

  @MinLength(3)
  licensePlate: string;
}
