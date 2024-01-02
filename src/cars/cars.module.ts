import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  /* Todos los servicios (*Service) son providers, pero no todos los providers son servicios. */
  providers: [CarsService],
})
export class CarsModule {}
