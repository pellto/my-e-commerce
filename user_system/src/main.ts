import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const port = 3001;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port,
    },
  });

  const configService = app.get(ConfigService);
  const stage = configService.get('NODE_STAGE');

  await app.listen();
  console.info(`[STAGE=${stage}] listening on port ${port}`);
}
bootstrap();
