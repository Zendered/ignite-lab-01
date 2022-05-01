import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
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
  const options: SwaggerCustomOptions = {
    customSiteTitle: 'Classroom api',
  };
  const config = new DocumentBuilder()
    .setTitle('Api for classroom')
    .setVersion('1.0')
    .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document, options);
  await app.listen(3002);
}
bootstrap();
