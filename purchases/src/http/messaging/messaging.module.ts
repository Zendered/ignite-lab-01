import { Module } from '@nestjs/common';
import { KafkaService } from '@/http/messaging/kafka.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class MessagingModule {}
