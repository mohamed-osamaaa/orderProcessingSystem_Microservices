import { Model } from 'mongoose';

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDto } from './dtos/create-product.dto';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<IProduct>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
    try {
      if (!createProductDto.name || !createProductDto.price) {
        throw new BadRequestException('Name and price are required');
      }

      const newProduct = new this.productModel(createProductDto);
      return await newProduct.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error creating product',
        error.message,
      );
    }
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    try {
      if (!id || id.trim() === '') {
        throw new BadRequestException('Product ID must be provided');
      }

      const result = await this.productModel.findByIdAndDelete(id);

      if (!result) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return { message: 'Product deleted successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error deleting product',
        error.message,
      );
    }
  }
}
