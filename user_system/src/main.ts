import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Coupang clone Project')
    .setDescription('Coupang clone coding Project')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, swaggerOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9093'],
      },
      consumer: {
        groupId: 'pelltos_kafka',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  console.info(`listening on port ${port}`);
}
bootstrap();
