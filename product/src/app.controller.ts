import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class AppController {
  constructor(private readonly productService: AppService) { }


  @Get()
  getHello(): string {
    return this.productService.getHello();
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
