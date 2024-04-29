import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My e-commerce Project')
    .setDescription('My e-commerce Project')
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

  const configService = app.get(ConfigService);
  const stage = configService.get('NODE_STAGE');

  await app.listen(port);
  console.info(`[STAGE=${stage}] listening on port ${port}`);
}
bootstrap();
