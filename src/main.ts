import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerSetup } from 'src/common/config/swagger.config';
import { AppModule } from 'src/modules/app.module';
const { SERVER_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.set('trust proxy', 1);
  app.setGlobalPrefix('api/');
  await SwaggerSetup(app);

  const PORT = SERVER_PORT || 3000;
  await app.listen(PORT, () =>
    Logger.log(`API Gateway is listening on port ${PORT}`),
  );
}

void bootstrap();
