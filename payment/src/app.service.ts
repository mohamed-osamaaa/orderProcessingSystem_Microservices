import { Model } from 'mongoose';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { CreatePaymentDto } from './dtos/create-payment.dto';
import { PaymentStatus } from './enums/payment-status.enum';
import { IPayment } from './interfaces/payment.interface';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {

  constructor(
    @Inject('PAYMENT_MODEL')
    private paymentModel: Model<IPayment>,

    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) { }

  async onModuleInit() {
    // Ensure Kafka producer is connected before emitting events
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  async processPayment(dto: CreatePaymentDto) {
    try {
      const payment = new this.paymentModel({
        ...dto,
        status: PaymentStatus.PENDING,
      });
      await payment.save();

      const success = dto.amount > 0 && Math.random() > 0.2; // 80% success
      payment.status = success ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
      await payment.save();


      this.kafkaClient.emit(
        success ? 'payment_success' : 'payment_failed',
        {
          userId: dto.userId,
          orderId: dto.orderId,
          amount: dto.amount,
          status: payment.status,
        },
      );


      return { payment, success };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while processing payment');
    }
  }


  async getPayments(): Promise<IPayment[]> {
    return this.paymentModel.find().exec();
  }
}
