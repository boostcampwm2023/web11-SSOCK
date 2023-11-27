import { NestFactory } from '@nestjs/core';
import { setupSwagger } from 'src/util/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
