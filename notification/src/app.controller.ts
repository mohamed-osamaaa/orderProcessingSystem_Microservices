import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly notificationService: AppService) { }

  @EventPattern('payment_success')
  async handlePaymentSuccess(@Payload() message: any) {
    const data = message.value;
    await this.notificationService.createNotification({
      userId: data.userId,
      title: 'Payment Successful',
      message: `Your payment of ${data.amount} for order ${data.orderId} was successful.`,
    });
  }

  @EventPattern('payment_failed')
  async handlePaymentFailed(@Payload() message: any) {
    const data = message.value;
    await this.notificationService.createNotification({
      userId: data.userId,
      title: 'Payment Failed',
      message: `Your payment of ${data.amount} for order ${data.orderId} has failed.`,
    });
  }

  @Get()
  async findAllNotifications() {
    return this.notificationService.getNotifications();
  }
}
