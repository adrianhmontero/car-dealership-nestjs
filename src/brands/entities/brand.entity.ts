/* Las entidades (que son clases al final) son únicas en cuanto a la sintaxis del nombre porque no tienen concatenado Entity después de brand,
porque las entidades usualmente están relacionadas con la conexión con ORMs o Gestor de bases de datos para trabajar con la base de datos, y
si nuestra clase se llamara BrandEntity, al final nuestra tabla en nuestra DB se llamaría así. Es por eso que incluso NestCLI omite esta sintaxis
al crear nuestras entidades. */
export class Brand {
  id: string;
  name: string;
  createdAt: number;
  updatedAt?: number;
}
