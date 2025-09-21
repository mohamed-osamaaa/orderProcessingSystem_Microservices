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
  await app.listen(String(process.env.PORT));
}
bootstrap();
