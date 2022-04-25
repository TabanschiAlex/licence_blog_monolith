import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/AppModule';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 80);
};

bootstrap();
