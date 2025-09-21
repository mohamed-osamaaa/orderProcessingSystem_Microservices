import { Connection } from 'mongoose';
import { PaymentSchema } from 'src/schemas/payment.schema';

export const paymentProviders = [
    {
        provide: 'PAYMENT_MODEL',
        useFactory: (connection: Connection) => connection.model('Payment', PaymentSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
