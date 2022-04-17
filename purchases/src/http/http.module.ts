import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [AuthController],
})
export class HttpModule {}
