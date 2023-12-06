import { NestFactory } from '@nestjs/core';
import { setupSwagger } from 'src/common/util/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true
    })
  );
  setupSwagger(app);
  logger.log(`Server is running on port ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
