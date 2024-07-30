import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const PORT = process.env.PORT || 4001
  await app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}'s port.`)
  });
}
bootstrap();
