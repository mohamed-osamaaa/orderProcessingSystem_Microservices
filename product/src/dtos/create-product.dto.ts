import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { ProductCategory } from 'src/enums/productCategory.enum';

import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Laptop', description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'High performance laptop', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 1500, description: 'Product price', minimum: 0 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: 10, description: 'Available stock quantity', minimum: 0 })
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty({ enum: ProductCategory, example: ProductCategory.ELECTRONICS })
    @IsEnum(ProductCategory)
    category: ProductCategory;

    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
