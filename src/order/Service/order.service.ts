import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from '../Dto/create-order.dto';
import { Book, User } from '@prisma/client';
import { CancelOrderDto } from '../Dto/cancel-order.dto';
import { OrderRepository } from '../Repository/order.repository';
import { ClientProxy } from '@nestjs/microservices';
import { QueueService } from 'src/queue.service';

@Injectable()
export class OrderService {
    constructor(
        private queueService: QueueService,
        private orderRepository: OrderRepository) {
    }

    create(createOrder: CreateOrderDto, authorization: string) {
        const newOrder = this.orderRepository.create(createOrder);
        this.queueService.sendToQueue('order-created', newOrder, authorization)
        return newOrder;
    }

    async findOrder(id: number, authorization: string) {
        const order = await this.orderRepository.findOrder(id);
        this.queueService.sendToQueue('singleOrder', order, authorization)
        return order;
    }

    async findAllOrders(authorization: string) {
        const orders = await this.orderRepository.findAllOrders();
        this.queueService.sendToQueue('getOrders', orders, authorization)
        return orders;
    }

    async cancelOrder(cancelOrder: CancelOrderDto, authorization: string) {
        const _order = await this.orderRepository.cancelOrder(cancelOrder);
        this.queueService.sendToQueue('cancelOrder', _order, authorization)
        return { message: "Order Cancelled" }
    }
}
