import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './common/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger
  });
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Duacoder RESTFul API')
    .setDescription('Duacoder swagger documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  logger.log(`App running on port: ${process.env.PORT}`);
}
bootstrap();
