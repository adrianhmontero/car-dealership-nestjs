import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Seat León TSI', 'Volkswaggen Golf GTI', 'Mazda 3'];

  @Get()
  getAllCars() {
    return this.cars;
  }

  @Get(':id')
  getCarById(@Param('id') id) {
    console.log({ id });
    const currentCar = this.cars?.[id];
    return currentCar ? { id, car: currentCar } : 'Not Found';
  }
}
