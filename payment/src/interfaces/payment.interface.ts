import { Document } from 'mongoose';

import { PaymentStatus } from '../enums/payment-status.enum';

export interface IPayment extends Document {
    orderId: string;
    userId: string;
    amount: number;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}