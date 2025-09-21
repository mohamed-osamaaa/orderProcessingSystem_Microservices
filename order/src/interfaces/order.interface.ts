import { Document } from 'mongoose';
import { OrderStatus } from 'src/enums/orderStatus.enum';

export interface IOrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

export interface IOrder extends Document { // extends Document from mongoose for  _id and timestamps and so one if added
    userId: string;
    items: IOrderItem[];
    amount: number;
    status: OrderStatus;
}
