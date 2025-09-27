import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { paymentProviders } from './providers/payment.providers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment-service',
            brokers: [String(process.env.KAFKA_BROKER)],
          },
          // consumer: {
          //   groupId: 'payment-consumer',
          //   numPartitions: 3,
          //   replicationFactor: 1,
          // },
          producerOnlyMode: true,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...paymentProviders
  ],
})
export class AppModule { }
