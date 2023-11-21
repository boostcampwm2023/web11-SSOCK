import { NestFactory } from '@nestjs/core';
import { setupSwagger } from 'src/util/swagger';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    //이 부분 추가
    ['/docs'], // docs(swagger end point)에 진입시
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD // 지정된 ID/비밀번호
      }
    })
  );
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
