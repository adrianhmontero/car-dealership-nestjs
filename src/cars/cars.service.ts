import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Seat',
      model: 'León TSI',
    },
    {
      id: 2,
      brand: 'Volkswaggen',
      model: 'Golf GTI',
    },
    {
      id: 3,
      brand: 'Mazda',
      model: '2',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const foundCar = this.cars.find((car) => car.id === id);
    if (!foundCar) throw new NotFoundException(`Car with id ${id} not found.`);
    return foundCar;
  }
}
