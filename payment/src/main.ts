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

  const rabbitService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [String(process.env.RABBITMQ_URL)],
      queue: 'payment_queue',
      queueOptions: { durable: true },
    },
  });
  rabbitService.listen();

  const restApp = await NestFactory.create(AppModule);
  restApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Payment Service')
    .setDescription('Payment API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(restApp, config);
  SwaggerModule.setup('docs', restApp, document);

  await restApp.listen(Number(process.env.PORT || 7003), '0.0.0.0');
}

bootstrap();
