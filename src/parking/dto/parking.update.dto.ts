import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class UpdateParkingDto {
  name: string;

  @MinLength(3)
  address: string;

  @IsNumber()
  hourlyPrice: number;
}
