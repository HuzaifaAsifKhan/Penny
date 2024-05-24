import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express'; // If want to add express platform in your application
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create<NestExpressApplication>(AppModule); If want to add express platform in your application
  // if (process.env.NODE_ENV == 'development') {
  app.enableCors();
  // }
  await app.listen(process.env.PORT || serverConfig.port);
}
bootstrap();
