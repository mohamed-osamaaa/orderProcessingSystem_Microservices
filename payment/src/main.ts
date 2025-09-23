import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {

  const rabbitService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [String(process.env.RABBITMQ_URL)],
      queue: 'payment_queue',
      queueOptions: { durable: true },
    },
  });
  rabbitService.listen();

  // const kafkaService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'payment-service',
  //       brokers: [String(process.env.KAFKA_BROKER)],
  //     },
  //     consumer: {
  //       groupId: 'payment-consumer',
  //       numPartitions: 3,
  //       replicationFactor: 1,
  //     },
  //   },
  // });
  // kafkaService.listen();


  const restApp = await NestFactory.create(AppModule);
  restApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await restApp.listen(Number(process.env.PORT));
}

bootstrap();
