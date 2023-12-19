import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { serverConfig } from './config/config';
import { writeFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      }, 'ApiKeyAuth')
    .addSecurityRequirements('ApiKeyAuth')
    .setTitle('todo example')
    .setDescription('The todo API description')
    .setVersion('1.0')
    .addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  writeFileSync("./swagger-spec.json", JSON.stringify(document));


  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(serverConfig.port);
  console.log(`app listen on port http://localhost:${serverConfig.port}/api`);

}
bootstrap();