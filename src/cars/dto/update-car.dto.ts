import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdateCarDto {
  @IsUUID()
  /* Si nosotros añadimos el decorador IsOptional, es recomendado usar el signo de interrogación ? en nuestra propiedad para indicarle a typescript que es opcional. (id?) */
  @IsOptional()
  readonly id?: string;

  /* Añadir Class Validator package es muy util porque nos proporciona varios DECORADORES para validar las propiedades de una clase (Por dar un ejemplo). */
  @IsString({ message: 'Brand is not correct! Must be a string.' })
  @IsNotEmpty()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  readonly model?: string;
}
