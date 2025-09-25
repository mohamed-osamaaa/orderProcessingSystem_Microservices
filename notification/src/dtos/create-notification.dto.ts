import {
    IsNotEmpty,
    IsString,
    Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
    @ApiProperty({ example: '64b8d8a1f3c3f0a123456789', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ example: 'Payment Successful', minLength: 3, maxLength: 100 })
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    title: string;

    @ApiProperty({ example: 'Your payment of $50 for order #123 was successful.', minLength: 5, maxLength: 255 })
    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    message: string;
}
