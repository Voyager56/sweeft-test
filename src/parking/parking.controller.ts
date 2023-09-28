import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParkingService } from './parking.service';
import { UserService } from './../user/user.service';
import { UserRole } from './../user/enums/user.role';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateParkingDto } from './dto/parking.create.dto';
import { UpdateParkingDto } from './dto/parking.update.dto';
import { RentParkingDto } from './dto/parking.rent.dto';
@UseGuards(JwtAuthGuard)
@Controller('parking')
export class ParkingController {
  constructor(
    private readonly parkingService: ParkingService,
    private readonly userService: UserService,
  ) {}

  @Get('/')
  async getAll(@Request() req) {
    let relations = [];
    const user = await this.userService.findById(req.userId, []);
    if (user.role === UserRole.Admin) {
      relations.push(['parkingHistory', 'parkedCar', 'parkedCar.user']);
    }
    this.parkingService.findAll(relations);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(AdminGuard)
  @Post('/')
  async store(@Request() req, @Body() parkingSpace: CreateParkingDto) {
    return this.parkingService.create(parkingSpace);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id) {
    return this.parkingService.delete(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() updateRequest: UpdateParkingDto) {
    return this.parkingService.update(id, updateRequest);
  }

  @UsePipes(ValidationPipe)
  @Post('rent/:id')
  async rentParkingSpace(
    @Param('id') id,
    @Request() req,
    @Body() rentRequest: RentParkingDto,
  ) {
    return this.parkingService.rentParkingSpace(
      id,
      req.user.email,
      rentRequest.carId,
    );
  }
}
