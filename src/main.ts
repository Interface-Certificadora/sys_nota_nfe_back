import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Api Nota NFe')
    .setDescription('documentação para rotas da api')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(port);
  console.log('.....');
  console.log('.....');
  console.log('.....');
  console.log(`Application is running on: http://localhost:${port}`);
  console.log('.....');
  console.log('.....');
  console.log('.....');
  console.log(`Documentation is running on: http://localhost:${port}/doc`);
  console.log('.....');
  console.log('.....');
  console.log('.....');
}
bootstrap();
