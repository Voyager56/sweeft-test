import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateParkingDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  hourlyPrice: number;
}
