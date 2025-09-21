import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';

import { AppService } from './app.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Controller()
export class AppController {
  constructor(private readonly paymentService: AppService) { }

  @EventPattern('process_payment')
  async handlePayment(@Payload() data: CreatePaymentDto) {
    return this.paymentService.processPayment(data);
  }

  @Get()
  async findAllPayments() {
    return this.paymentService.getPayments();
  }
}
