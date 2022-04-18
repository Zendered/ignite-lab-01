import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { ProductsController } from './auth/controllers/products.controller';
import { PurchasesController } from './auth/controllers/purchases.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [ProductsController, PurchasesController],
  providers: [ProductsService, PurchasesService],
})
export class HttpModule {}
