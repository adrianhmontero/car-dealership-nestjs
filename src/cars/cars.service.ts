import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interface/car.interface';
import { v4 as uuid } from 'uuid';

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
}
