import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export const SwaggerSetup = async (app: INestApplication) => {

  const documents = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('NEST PROJECT | API Documentation ')
      .setDescription(
        `Last Updated : ${new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
          timeZoneName: 'short',
        })}`,
      )
      .setVersion('1.0.0')
      .addServer(<string>process.env.BASE_URL, 'dev')
      .build(),
  );

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: `NEST PROJECT [Swagger]`,
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  return SwaggerModule.setup('/api', app, documents, customOptions);
};
