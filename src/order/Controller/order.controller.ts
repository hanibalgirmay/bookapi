import { Controller, Post, Get, Param, ParseIntPipe, Put, Body, UseGuards, Inject, Request } from '@nestjs/common';
import { OrderService } from '../Service/order.service';
import { CreateOrderDto } from '../Dto/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from '../Entity/order.entity';
import { CancelOrderDto } from '../Dto/cancel-order.dto';
import { JwtAuthGuard } from 'src/auth/Guard/jwt.auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('order')
@ApiTags('Order')
export class OrderController {
    constructor(
        private orderService: OrderService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @MessagePattern('getOrders')
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    orders(@Request() req) {
        const authorization = req.headers.authorization;
        return this.orderService.findAllOrders(authorization);
    }

    @Get(':id')
    @MessagePattern('singleOrder')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OrderEntity })
    singleOrder(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const authorization = req.headers.authorization;
        return this.orderService.findOrder(id, authorization);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @EventPattern('order-created')
    @ApiCreatedResponse({ type: OrderEntity })
    createOrder(@Body() createOrder: CreateOrderDto, @Request() req) {
        const authorization = req.headers.authorization;
        return this.orderService.create(createOrder, authorization)
    }

    @Put('cancel')
    @UseGuards(JwtAuthGuard)
    @MessagePattern('cancelOrder')
    @ApiOkResponse({ type: OrderEntity })
    async cancelOrder(@Body() cancelOrder: CancelOrderDto, @Request() req) {
        const authorization = req.headers.authorization;
        return await this.orderService.cancelOrder(cancelOrder, authorization);
    }

}
