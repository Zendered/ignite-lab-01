import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: [`${process.env.KAFKA_BROKERS}`],
      },
    },
  });
  app.startAllMicroservices().then(() => {
    console.log('[Classroom], Microservice running!');
  });
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
