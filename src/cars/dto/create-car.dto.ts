import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  /* Añadir Class Validator package es muy util porque nos proporciona varios DECORADORES para validar las propiedades de una clase (Por dar un ejemplo). */
  @IsString({ message: 'Brand is not correct! Must be a string.' })
  @IsNotEmpty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly model: string;
}
