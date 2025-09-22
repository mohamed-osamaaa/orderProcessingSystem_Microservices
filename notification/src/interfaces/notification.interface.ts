import { Document } from 'mongoose';

export interface INotification extends Document {
    userId: string;
    title: string;
    message: string;
}