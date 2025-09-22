import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const kafkaService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification-service',
        brokers: [String(process.env.KAFKA_BROKER)],
      },
      consumer: {
        groupId: 'notification-consumer',
      },
    },
  });
  kafkaService.listen();

  const restApp = await NestFactory.create(AppModule);
  restApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await restApp.listen(Number(process.env.PORT));
}

bootstrap();
