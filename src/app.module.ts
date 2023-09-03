import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderModule } from './order/order.module';
import { BookModule } from './book/book.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQConfig } from './utils/RabbitMQConfig';

const rabbitMQConfig: RabbitMQConfig = {
  url: 'amqp://localhost:5672',
  queue: 'bookapiQueue'
};
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_API_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMQConfig.url],
          queue: rabbitMQConfig.queue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    OrderModule,
    BookModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule { }
