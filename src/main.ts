import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from './config/getEnvs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Shopping-cart-service');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: env.natsServer
    }
  });
  await app.listen();
  logger.log('Shopping-cart-service started on prod :D');
}
bootstrap();
