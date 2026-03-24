import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const config = new DocumentBuilder().setTitle('DEV-LOG');
  await app
    .listen(port ?? 3000)
    .then(() => console.log(`Application is live on port ${port}`));
}
bootstrap();
