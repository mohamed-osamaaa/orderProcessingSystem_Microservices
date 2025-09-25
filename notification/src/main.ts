import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription('Authentication API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(restApp, config);
  SwaggerModule.setup('docs', restApp, document);


  await restApp.listen(Number(process.env.PORT));
}

bootstrap();
