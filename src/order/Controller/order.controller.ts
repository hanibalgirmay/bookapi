import { Controller, Post, Get, Param, ParseIntPipe, Put, Body, UseGuards, Inject } from '@nestjs/common';
import { OrderService } from '../Service/order.service';
import { CreateOrderDto } from '../Dto/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from '../Entity/order.entity';
import { CancelOrderDto } from '../Dto/cancel-order.dto';
import { JwtAuthGuard } from 'src/auth/Guard/jwt.auth.guard';
import { ClientProxy } from '@nestjs/microservices';


@Controller('order')
@ApiTags('Order')
export class OrderController {
    constructor(
        // @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy, 
        private orderService: OrderService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    orders() {
        const orders = this.orderService.findAllOrders();
        // this.client.send('getOrders', orders);

        return orders;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OrderEntity })
    singleOrder(@Param('id', ParseIntPipe) id: number) {
        const order = this.orderService.findOrder(id);
        // this.client.send('getOrders', order);

        return order;

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ type: OrderEntity })
    createOrder(@Body() createOrder: CreateOrderDto) {
        const newOrder = this.orderService.create(createOrder)
        // this.client.send('getOrders', newOrder);

        return newOrder;
    }

    @Put('cancel')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OrderEntity })
    cancelOrder(@Body() cancelOrder: CancelOrderDto) {
        const cancel = this.orderService.cancelOrder(cancelOrder);
        // this.client.send('getOrders', cancel);

        return cancel;
    }

}
