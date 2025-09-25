import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@ApiTags('Notifications')
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
  @ApiResponse({
    status: 200,
    description: 'List of all notifications',
    type: [CreateNotificationDto],
  })
  async findAllNotifications() {
    return this.notificationService.getNotifications();
  }
}
