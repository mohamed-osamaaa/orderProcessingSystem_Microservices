import { Schema } from 'mongoose';

import { PaymentStatus } from '../enums/payment-status.enum';

export const PaymentSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING
        },
    },
    {
        timestamps: true
    },
);