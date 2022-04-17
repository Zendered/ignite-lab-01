import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
})
export class HttpModule {}
