import { NestFactory } from '@nestjs/core';
import { setupSwagger } from 'src/util/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { useContainer } from '@nestjs/class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
