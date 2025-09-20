import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { productsProviders } from './providers/product.providers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...productsProviders
  ],
})
export class AppModule { }
