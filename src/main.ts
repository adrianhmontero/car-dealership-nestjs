import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* El useGlobalPipes permite añadir pipes a toda nuestra aplicación para que se reutilicen donde se indique. Es decir, en vez de que nosotros añadamos el ValidationPipe (Por dar un ejemplo)
  en cada método donde lo necesitemos, lo que haremos será únicamente añadirlo en nuestro useGlobalPipes como una nueva instancia y en nuestros métodos lo único que haremos será
  añadir los DTOs donde sea necesario para que este pipe a nivel de aplicación haga las validaciones correspondientes. GENIAL!  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
