import { Document } from 'mongoose';

import { ProductCategory } from '../enums/productCategory.enum';

export interface Product extends Document {
    readonly name: string;
    readonly description?: string;
    readonly price: number;
    readonly stock: number;
    readonly category: ProductCategory;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
