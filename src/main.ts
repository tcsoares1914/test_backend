import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('api.port');
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}/`, 'NestBootstrap');
}
bootstrap();
