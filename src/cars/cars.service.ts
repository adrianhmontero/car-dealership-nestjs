import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interface/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Seat',
      model: 'León TSI',
    },
    {
      id: uuid(),
      brand: 'Volkswaggen',
      model: 'Golf GTI',
    },
    {
      id: uuid(),
      brand: 'Mazda',
      model: '2',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const foundCar = this.cars.find((car) => car.id === id);
    if (!foundCar) throw new NotFoundException(`Car with id ${id} not found.`);
    return foundCar;
  }

  create(createCarDto: CreateCarDto) {
    const newCar = { id: uuid(), ...createCarDto };
    this.cars.push(newCar);

    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Car ID is not valid inside request body.');

    /* El principio DRY (Don't Repeat Yourself) indica que debemos reutilizar código para no reescribirlo. A continuación está el código para encontrar el carro que el cliente
    quiere actualizar, así que lo comentaremos y para respetar el principio, reutilizaremos el método findOneById. */
    let currentCar =
      /* this.cars.find((car) => car?.id === id) */ this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car?.id === id) {
        currentCar = { ...currentCar, ...updateCarDto, id };
        return currentCar;
      }
      return car;
    });
    return currentCar;
  }

  delete(id: string) {
    const carToDelete = this.findOneById(id);
    this.cars = this.cars.filter((car) => car?.id !== carToDelete?.id);
    return;
  }
}
