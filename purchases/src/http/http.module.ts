import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/database.module';
import { CustomersService } from '@/http/services/customers.service';
import { ProductsService } from '@/http/services/products.service';
import { PurchasesService } from '@/http/services/purchases.service';
import { CustomersController } from '@/http/controllers/customers.controller';
import { ProductsController } from '@/http/controllers/products.controller';
import { PurchasesController } from '@/http/controllers/purchases.controller';
import { MessagingModule } from '@/http/messaging/messaging.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, MessagingModule],
  controllers: [CustomersController, ProductsController, PurchasesController],
  providers: [ProductsService, PurchasesService, CustomersService],
})
export class HttpModule {}
