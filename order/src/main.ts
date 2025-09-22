import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [String(process.env.RABBITMQ_URL)],
      queue: 'payment_queue',
      queueOptions: { durable: true },
    },
  });
  await microservice.listen();


  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(Number(process.env.PORT));
}
bootstrap();
