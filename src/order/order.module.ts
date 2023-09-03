import { Module } from '@nestjs/common';
import { OrderService } from './Service/order.service';
import { OrderController } from './Controller/order.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma.service';
import { OrderRepository } from './Repository/order.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueService } from 'src/queue.service';

@Module({
  imports: [
    UserModule,
    ClientsModule.register([{
      name: 'BOOK_API_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'bookapiQueue',
        queueOptions: {
          durable: false
        }
      }
    }]),
  ],
  providers: [OrderService, OrderRepository, PrismaService, QueueService],
  controllers: [OrderController]
})
export class OrderModule { }
