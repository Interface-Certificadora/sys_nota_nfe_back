import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const BaseUrl = process.env.BASE_URL;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Api Nota NFe')
    .setDescription(`documentação para rotas da api url de acesso ${BaseUrl}`)
    .setVersion('1.0')
    .setBasePath('api')
    .addServer(`http://localhost:${port}`, 'Servidor Local')
    .addServer(BaseUrl, 'Servidor de Produção') // 👈 Base URL
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro se houver propriedades não definidas
      transform: true, // Converte automaticamente os tipos
    }),
  );

  // Aumenta o limite do payload para 50MB
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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
