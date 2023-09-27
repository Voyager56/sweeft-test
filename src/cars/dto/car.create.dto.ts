import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { CarType } from '../enums/car-types.enum';
export class CreateCarDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEnum(CarType)
  carType: CarType;

  @IsNotEmpty()
  @MinLength(3)
  licensePlate: string;
}
