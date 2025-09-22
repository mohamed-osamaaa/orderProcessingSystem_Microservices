import { Connection } from 'mongoose';

import { notificationSchema } from '../schemas/notification.schema';

export const notificationsProviders = [
    {
        provide: 'NOTIFICATION_MODEL',
        useFactory: (connection: Connection) => connection.model('Notification', notificationSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
