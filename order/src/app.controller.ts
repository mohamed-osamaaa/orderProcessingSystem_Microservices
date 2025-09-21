import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './interfaces/order.interface';

@Controller('orders')
export class AppController {
  constructor(private readonly ordersService: AppService) { }


  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<{ message: string; order: Order }> {
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
}
