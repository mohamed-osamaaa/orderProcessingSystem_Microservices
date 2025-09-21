import { Document } from 'mongoose';
import { OrderStatus } from 'src/enums/orderStatus.enum';

export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Order extends Document { // extends Document from mongoose for  _id and timestamps and so one if added
    userId: string;
    items: OrderItem[];
    amount: number;
    status: OrderStatus;
}
