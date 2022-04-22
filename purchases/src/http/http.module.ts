import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { CustomersService } from 'src/services/customers.service';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomersController } from '@/controllers/customers.controller';
import { ProductsController } from '@/controllers/products.controller';
import { PurchasesController } from '@/controllers/purchases.controller';
import { MessagingModule } from '@/messaging/messaging.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, MessagingModule],
  controllers: [CustomersController, ProductsController, PurchasesController],
  providers: [ProductsService, PurchasesService, CustomersService],
})
export class HttpModule {}
