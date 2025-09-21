import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { PaymentStatus } from '../../payment/src/enums/payment-status.enum';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from './enums/orderStatus.enum';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor(
    @Inject('ORDER_MODEL')
    private readonly orderModel: Model<IOrder>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [String(process.env.RABBITMQ_URL)],
        queue: 'payment_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }



  async create(createOrderDto: CreateOrderDto): Promise<{ message: string; order: IOrder }> {
    try {
      const totalAmount = createOrderDto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const createdOrder = new this.orderModel({
        ...createOrderDto,
        amount: totalAmount,
        status: OrderStatus.PENDING,
      });

      const savedOrder = await createdOrder.save();
      if (!savedOrder) throw new InternalServerErrorException('Failed to save order');

      try {
        // const paymentResult: any = await this.client
        //   .send('process_payment', {
        //     orderId: savedOrder._id,
        //     userId: savedOrder.userId,
        //     amount: savedOrder.amount,
        //   })
        //   .toPromise();
        const paymentResult: any = await firstValueFrom(
          this.client.send('process_payment', {
            orderId: savedOrder._id,
            userId: savedOrder.userId,
            amount: savedOrder.amount,
          })
        );

        if (paymentResult.payment.status === PaymentStatus.SUCCESS) {
          await this.updateOrderStatus(String(savedOrder._id), OrderStatus.PAID);
        } else {
          await this.updateOrderStatus(String(savedOrder._id), OrderStatus.CANCELED);
        }
      }
      catch (paymentErr) {
        // console.error('Error processing payment:', paymentErr.message);
        await this.updateOrderStatus(String(savedOrder._id), OrderStatus.CANCELED);
      }

      return {
        message: 'Order created successfully and payment processed',
        order: savedOrder,
      };
    } catch (err) {
      console.error('Error creating order:', err.message);
      throw new InternalServerErrorException('Could not create order');
    }
  }

  async findAll(): Promise<IOrder[]> {
    try {
      const orders = await this.orderModel.find();
      return orders;
    } catch (err) {
      console.error('Error fetching orders:', err.message);
      throw new InternalServerErrorException('Could not fetch orders');
    }
  }

  async findOne(id: string): Promise<IOrder> {
    try {
      const order = await this.orderModel.findById(id);

      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }

      return order;
    } catch (err) {
      console.error('Error fetching order:', err.message);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Could not fetch order');
    }
  }


  async updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    try {
      await this.orderModel.findByIdAndUpdate(id, { status });
    } catch (err) {
      throw new InternalServerErrorException('Could not update order status');
    }
  }
}
