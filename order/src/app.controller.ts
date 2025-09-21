import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { AppService } from './app.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from './enums/orderStatus.enum';
import { IOrder } from './interfaces/order.interface';

@Controller('orders')
export class AppController {
  constructor(private readonly ordersService: AppService) { }


  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<{ message: string; order: IOrder }> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('payment_success')
  async handlePaymentSuccess(@Payload() data: { orderId: string }) {
    await this.ordersService.updateOrderStatus(data.orderId, OrderStatus.PAID);
  }

  @MessagePattern('payment_failed')
  async handlePaymentFailed(@Payload() data: { orderId: string }) {
    await this.ordersService.updateOrderStatus(data.orderId, OrderStatus.CANCELED);
  }
}
