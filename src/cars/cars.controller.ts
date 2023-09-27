import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/car.create.dto';
import { DeleteCarDto } from './dto/car.delete.dto';
import { UpdateCarDto } from './dto/car.update.dto';

@Controller('cars')
@UseGuards(JwtAuthGuard)
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get('/')
  getAll(@Request() req) {
    return this.carService.getAll(req.userId);
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  create(@Request() req, @Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto, req.userId);
  }

  @UsePipes(ValidationPipe)
  @Post('/delete')
  delete(@Request() req, @Body() deletecarDto: DeleteCarDto) {
    return this.carService.delete(req.userId, deletecarDto.id);
  }

  @UsePipes(ValidationPipe)
  @Post('/update')
  update(@Request() req, @Body() UpdateCarDto: UpdateCarDto) {
    return this.carService.update(req.userId, UpdateCarDto);
  }
}
