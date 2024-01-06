import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // { id: uuid(), name: 'Seat', createdAt: new Date().getTime() },
  ];
  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      ...createBrandDto,
      createdAt: new Date().getTime(),
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const foundBrand = this.brands.find((brand) => brand?.id === id);
    if (!foundBrand)
      throw new NotFoundException(`Brand with ID "${id}" is not found.`);

    return foundBrand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let foundBrand = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand?.id === id) {
        foundBrand = {
          ...brand,
          ...updateBrandDto,
          id,
          updatedAt: new Date().getTime(),
        };
        return foundBrand;
      }
      return brand;
    });
    return foundBrand;
  }

  remove(id: string) {
    const brandToDelete = this.findOne(id);
    this.brands = this.brands.filter(
      (brand) => brand?.id !== brandToDelete?.id,
    );
    return;
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
