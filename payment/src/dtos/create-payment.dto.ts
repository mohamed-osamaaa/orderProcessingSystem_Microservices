import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({ example: '64b8d8a1f3c3f0a123456789', description: 'Order ID' })
    @IsString()
    @IsNotEmpty()
    orderId: string;

    @ApiProperty({ example: '64b8d8a1f3c3f0a987654321', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ example: 150, description: 'Payment amount' })
    @IsNumber()
    amount: number;
}
