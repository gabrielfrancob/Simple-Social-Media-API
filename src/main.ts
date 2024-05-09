import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     exceptionFactory: (errors) => {
  //       const messages = errors.map((error) => ({
  //         property: error.property,
  //         constraints: Object.values(error.constraints),
  //       }));
  //       return new BadRequestException({
  //         errors: messages,
  //         message: 'Erro de validação',
  //       });
  //     },
  //   }),
  // );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
