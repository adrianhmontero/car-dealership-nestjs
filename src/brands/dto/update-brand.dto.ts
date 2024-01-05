// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBrandDto } from './create-brand.dto';

import { IsString, MinLength } from 'class-validator';

/* La extensión a PartialType(CreateBrandDto) nos permite extender nuestra clase con base en otro DTO con las mismas propiedades, tal como lo es el DTO CreateBrandDto,
pero nuestra clase UpdateBrandDto tendrá todas sus propiedades opcionales. */
// export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

/* Por ahora vamos a utilizar la declaración de nuestra clase de manera tradicional, porque tiene más sentido extender nuestra clase con PartialType cuando
nuestro servicio de PATCH puede modificar más de una propiedad de un registro. En el caso de las Brands, únicamente se puede actualizar el nombre. Es por eso
que utilizaremos el método tradicional, ya que indicaremos que el nombre debe ser requerido en el cuerpo de nuestra petición porque, al ser la única propiedad
editable, no tendría sentido que el cliente pueda ejecutar el servicio si no va a actualizar en nombre. */
export class UpdateBrandDto {
  @IsString()
  @MinLength(1)
  name: string;
}
