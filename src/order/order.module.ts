import { Module } from '@nestjs/common';
import { OrderService } from './Service/order.service';
import { OrderController } from './Controller/order.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma.service';
import { OrderRepository } from './Repository/order.repository';
import { RabbitMQModule } from 'src/rabbitmq.module';

@Module({
  imports: [
    UserModule,
    // RabbitMQModule
  ],
  providers: [OrderService, OrderRepository, PrismaService],
  controllers: [OrderController]
})
export class OrderModule { }
