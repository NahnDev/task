import {
  BadRequestException,
  ClassSerializerInterceptor,
  RequestMethod,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export const ROUTE_PREFIX = 'api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(ROUTE_PREFIX);
  app.enableVersioning({
    prefix: 'v',
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const port = app.get(ConfigService).get<number>('server.port');
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('Task').setVersion('1.0').build(),
  );
  SwaggerModule.setup('rest', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(validationErrors),
    }),
  );

  await app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  });
}
bootstrap();
