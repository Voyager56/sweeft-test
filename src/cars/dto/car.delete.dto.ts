import { IsNotEmpty } from 'class-validator';
import { CarType } from '../enums/car-types.enum';
export class DeleteCarDto {
  @IsNotEmpty()
  id: string;
}
