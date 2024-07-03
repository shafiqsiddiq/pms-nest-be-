import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const PORT: number = parseInt(process.env.PORT, 10) || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: false,
      forbidNonWhitelisted: true,
    }),
  );

  // Serve static files from the 'uploads' directory
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  const config = new DocumentBuilder()
    .setTitle('PMS')
    .setDescription('PMS Apis')
    .setVersion('1.0')
    .addTag('PMS Api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    Logger.log(`Running server on port ${PORT}`);
  });
}
bootstrap();