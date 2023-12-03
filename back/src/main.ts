import { NestFactory } from '@nestjs/core';
import { setupSwagger } from 'src/common/util/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
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
  await app.listen(3000);
}
bootstrap();
