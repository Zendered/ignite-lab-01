import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { CustomersService } from 'src/services/customers.service';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomersController } from '@/controllers/customers.controller';
import { ProductsController } from '@/controllers/products.controller';
import { PurchasesController } from '@/controllers/purchases.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [CustomersController, ProductsController, PurchasesController],
  providers: [ProductsService, PurchasesService, CustomersService],
})
export class HttpModule {}
