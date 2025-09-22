import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { notificationsProviders } from './providers/notifications.providers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...notificationsProviders
  ],
})
export class AppModule { }
