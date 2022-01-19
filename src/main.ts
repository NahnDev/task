import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(ConfigService).get<number>('server.port');
  const config = new DocumentBuilder()
    .setTitle('TOtask')
    .addBearerAuth()
    .build();
  const apiDoc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, apiDoc);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  });
}
bootstrap();
