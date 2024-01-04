import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  /* El pipe ParseIntPipe permite transformar el tipo de parámetro. Los parámetros siempre son string, pero si nosotros esperamos números  en nuestro parámetro
  (Por dar un ejemplo) y el cliente manda '2jn2' (Por dar otro ejemplo), la petición devolverá una excepción 400 que indique que un string numérico
  es esperado.
  
  El pipe ParseUUIDPipe permite validar que el parámetro sea la sintaxis de UUID. Para que se haga dicha validación, hay que añadir el pipe después del string del parámetro en el decorador
  @Param. Si queremos validar una sintaxis específica dependiendo la versión, podemos crear una instancia del pipe y en los parámetros, mandamos un objeto con la propiedad 'version'
  que defina la versión de la sintaxis a evaluar. Es importante mencionar que al hacer una nueva instancia, nestJS no estará reutilizando la instancia. Si no que,  cada vez que
  llamemos nuestro servicio va a crear una nueva.
  */
  getCarById(
    @Param('id', new ParseUUIDPipe({ version: '4' }) /* ParseIntPipe */)
    id: string,
  ) {
    console.log({ id });
    const currentCar = this.carsService.findOneById(id);
    return currentCar ?? 'Not Found';
  }

  @Post()
  /* Utilizar el pipe UsePipes puede ser agotador a este nivel, porque tendríamos que añadirlo en cada método que necesite validar algun objeto. Es por ello que
  NestJS recomienda utilizarlo a un nivel de aplicación para reutilizarlo en todos los métodos/servicios de todos los módulos que lo necesiten. */
  // @UsePipes(ValidationPipe)
  /* El decorador @Body nos permite obtener el cuerpo de la solicitud del cliente a nuestro servicio. En este caso, el body se definió como any porque
  no sabemos cómo luce el cuerpo de la solicitud. */
  createCar(@Body() createCarDto: CreateCarDto) {
    const newCar = this.carsService.create(createCarDto);
    return newCar;
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
