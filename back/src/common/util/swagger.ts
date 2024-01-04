import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

export function setupSwagger(app: INestApplication): void {
  app.use(
    ['/docs'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD
      }
    })
  );
  const config = new DocumentBuilder()
    .setTitle('SSOCK API')
    .setDescription('The SSOCK API description')
    .setVersion('1.0')
    .addTag('ssock')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: `${process.env.AUTHORIZATION_URL}`,
          scopes: {
            profile: 'profile'
          }
        }
      }
    })
    .addCookieAuth('access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });
}
