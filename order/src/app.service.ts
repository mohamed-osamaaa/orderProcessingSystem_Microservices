import { Model } from 'mongoose';

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

import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from './enums/orderStatus.enum';
import { Order } from './interfaces/order.interface';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor(
    @Inject('ORDER_MODEL')
    private readonly orderModel: Model<Order>,
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



  async create(createOrderDto: CreateOrderDto): Promise<{ message: string; order: Order }> {
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

      if (!savedOrder) {
        throw new InternalServerErrorException('Failed to save order');
      }

      try {
        this.client.emit('process_payment', {
          orderId: savedOrder._id,
          userId: savedOrder.userId,
          amount: savedOrder.amount,
        });
      } catch (err) {
        console.error('Failed to send message to Payment Service:', err.message);
      }

      return {
        message: 'Order created successfully, payment request sent',
        order: savedOrder,
      };
    } catch (err) {
      console.error('Error creating order:', err.message);
      throw new InternalServerErrorException('Could not create order');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderModel.find();
      return orders;
    } catch (err) {
      console.error('Error fetching orders:', err.message);
      throw new InternalServerErrorException('Could not fetch orders');
    }
  }

  async findOne(id: string): Promise<Order> {
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
}
