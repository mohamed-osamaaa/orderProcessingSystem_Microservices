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

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsEnum(ProductCategory)
    category: ProductCategory;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
