import { Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
    @ApiProperty({ example: '64b8d8a1f3c3f0a123456789', description: 'Product ID' })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ example: 'iPhone 15 Pro', description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 2, description: 'Quantity ordered', minimum: 1 })
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({ example: 999, description: 'Price per item', minimum: 0 })
    @IsNumber()
    @Min(0)
    price: number;
}

export class CreateOrderDto {
    @ApiProperty({ example: '64b8d8a1f3c3f0a123456789', description: 'User ID who placed the order' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: [OrderItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}
