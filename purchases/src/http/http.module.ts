import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsService } from 'src/services/products.service';
import { ProductsController } from './auth/controllers/products.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class HttpModule {}
