import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from '../Dto/create-order.dto';
import { Book, User } from '@prisma/client';
import { CancelOrderDto } from '../Dto/cancel-order.dto';
import { OrderRepository } from '../Repository/order.repository';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository) { }

    create(createOrder: CreateOrderDto) {
        return this.orderRepository.create(createOrder);
    }

    findOrder(id: number) {
        return this.orderRepository.findOrder(id);
    }

    findAllOrders() {
        return this.orderRepository.findAllOrders();
    }

    cancelOrder(cancelOrder: CancelOrderDto) {
        return this.orderRepository.cancelOrder(cancelOrder);
    }
}
