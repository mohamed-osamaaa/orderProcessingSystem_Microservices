import { Model } from 'mongoose';

import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { CreateNotificationDto } from './dtos/create-notification.dto';
import { INotification } from './interfaces/notification.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject('NOTIFICATION_MODEL')
    private notificationModel: Model<INotification>,
  ) { }

  async createNotification(dto: CreateNotificationDto): Promise<INotification> {
    const notification = new this.notificationModel(dto);
    return notification.save();
  }

  async getNotifications(): Promise<INotification[]> {
    return this.notificationModel.find().exec();
  }
}
