import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  /* Este pipe permite transformar el tipo de parámetro. Los parámetros siempre son string, pero si nosotros esperamos números  en nuestro parámetro
  (Por dar un ejemplo) y el cliente manda '2jn2' (Por dar otro ejemplo), la petición devolverá una excepción 400 que indique que un string numérico
  es esperado. */
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log({ id });
    const currentCar = this.carsService.findOneById(id);
    return currentCar ?? 'Not Found';
  }

  @Post()
  /* El decorador @Body nos permite obtener el cuerpo de la solicitud del cliente a nuestro servicio. En este caso, el body se definió como any porque
  no sabemos cómo luce el cuerpo de la solicitud. */
  createCar(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return { method: 'DELETE', id };
  }
}
