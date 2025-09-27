import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@ApiTags('Payments')
@Controller()
export class AppController {
  constructor(private readonly paymentService: AppService) { }

  @MessagePattern('process_payment')
  async handlePayment(@Payload() data: CreatePaymentDto) {
    return this.paymentService.processPayment(data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all payments',
    type: [CreatePaymentDto],
  })
  async findAllPayments() {
    return this.paymentService.getPayments();
  }
}
