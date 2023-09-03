import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from '../Dto/create-order.dto';
import { CancelOrderDto } from '../Dto/cancel-order.dto';
import { Book, Order, User } from '@prisma/client';

@Injectable()
export class OrderRepository {
    constructor(private prismaService: PrismaService) { }

    async create(createOrder: CreateOrderDto) {
        const book: Book | null = await this.prismaService.book.findUnique({
            where: { id: createOrder.bookId },
        });

        const user: User | null = await this.prismaService.user.findUnique({
            where: { id: createOrder.userId },
        });

        const userPoint = this.prismaService.userPoint.findUnique({
            where: { userId: createOrder.userId },
        });

        if (!book || !user) {
            throw new NotFoundException('Book or user not found.');
        }

        const totalPrice = (await userPoint).point - book.point;

        if (totalPrice < 0) {
            throw new BadRequestException('Insufficient balance to order the book.');
        }

        const order = await this.prismaService.order.create({
            data: {
                book: { connect: { id: createOrder.bookId } },
                user: { connect: { id: createOrder.userId } },
                price: book.point,
            },
        });

        // Update the user's balance
        await this.prismaService.userPoint.update({
            where: { id: user.id },
            data: { point: totalPrice },
        });

        return order;
    }

    findOrder(id: number): Promise<Order | null> {
        return this.prismaService.order.findUnique({
            where: { id },
            include: { book: true, user: true },
        });
    }

    findAllOrders(): Promise<Order[]> {
        return this.prismaService.order.findMany({
            include: { book: true, user: true },
        });
    }

    async cancelOrder(createOrder: CancelOrderDto) {
        const user: User | null = await this.prismaService.user.findUnique({
            where: { id: createOrder.userId },
        });

        if (user) {
            const order = this.prismaService.order.findUnique({
                where: { id: createOrder.id },
            });
            const userPoint = this.prismaService.userPoint.findUnique({
                where: { userId: createOrder.userId },
            });

            const totalPrice = (await userPoint).point + (await order).price;

            // Update the user's balance
            await this.prismaService.userPoint.update({
                where: { id: user.id },
                data: { point: totalPrice },
            });
        }
    }
}