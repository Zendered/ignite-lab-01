import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsController } from './auth/controllers/products.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [ProductsController],
})
export class HttpModule {}
