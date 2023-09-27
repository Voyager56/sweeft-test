import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/car.create.dto';
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
  @Post('/')
  create(@Request() req, @Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto, req.userId);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.carService.delete(req.userId, id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':id')
  update(
    @Request() req,
    @Body() UpdateCarDto: UpdateCarDto,
    @Param('id') id: string,
  ) {
    return this.carService.update(req.userId, UpdateCarDto, id);
  }
}
