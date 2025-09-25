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
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from './enums/orderStatus.enum';
import { IOrder } from './interfaces/order.interface';

@ApiTags('Orders')
@Controller('orders')
export class AppController {
  constructor(private readonly ordersService: AppService) { }


  @Post()
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<{ message: string; order: IOrder }> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all orders' })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '64b8d8a1f3c3f0a123456789' })
  @ApiResponse({ status: 200, description: 'Get order by ID' })
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
