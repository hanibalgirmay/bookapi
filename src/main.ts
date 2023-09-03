import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { RabbitMQConfig } from './utils/RabbitMQConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // RabbitMQ configuration
  // const rabbitMQConfig: RabbitMQConfig = {
  //   url: 'amqp://localhost:5672',
  //   queue: 'bookapiQueue'
  // };

  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [rabbitMQConfig.url],
  //     queue: rabbitMQConfig.queue,
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  await app.startAllMicroservices();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription('The Book API description')
    .setVersion('1.0')
    .addTag('booksAPI')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Add security scheme
  document.components.securitySchemes = {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: '',
    },
  };
  // Include security requirement for protected routes
  document.security = [{ bearerAuth: [] }];

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
