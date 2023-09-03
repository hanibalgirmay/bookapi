import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserPointEvent } from './user-point.event';
import { PrismaService } from 'src/prisma.service';
import { UserPoint } from '@prisma/client';
import { INITIAL_POINTS } from 'src/utils/Constant';

@Injectable()
export class UserCreatedListener {
    private eventLogger = new Logger(UserCreatedListener.name);

    constructor(private prismaService: PrismaService) { }

    @OnEvent("point")
    async handleUserCreatedEvent(event: UserPointEvent) {
        const { point, userId } = event;
        // handle and process "OrderCreatedEvent" event
        console.log("event: ", event);
        this.eventLogger.debug("event: ", event);
        const userPointData: Omit<UserPoint, 'id' | 'createdAt' | 'updatedAt'> = {
            point: point,
            userId: userId
        };

        try {
            const createdUserPoint = await this.prismaService.userPoint.create({
                data: userPointData,
            });
            console.log(`UserPoint created for user with ID ${userId}`);
        } catch (error) {
            console.error(`Error creating UserPoint for user with ID ${userId}:`, error);
        }
    }
}