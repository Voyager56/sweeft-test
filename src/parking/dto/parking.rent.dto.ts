import { IsNotEmpty } from 'class-validator';

export class RentParkingDto {
  @IsNotEmpty()
  carId: string;
}
