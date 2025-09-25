import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { CreateProductDto } from './dtos/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class AppController {
  constructor(private readonly productService: AppService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'API is running' })
  getHello(): string {
    return this.productService.getHello();
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '64b8d8a1f3c3f0a123456789' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
