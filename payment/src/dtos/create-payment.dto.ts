import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    orderId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    amount: number;
}