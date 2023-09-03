import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from '../Dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedListener } from '../Events/user-created-listener';
import { INITIAL_POINTS } from 'src/utils/Constant';
import { UserPointEvent } from '../Events/user-point.event';

export const roundsOfHashing = 10;

@Injectable()
export class UserRepository {
    private userLogger = new Logger(UserRepository.name);

    constructor(
        private readonly prisma: PrismaService,
        private eventEmitter: EventEmitter2,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            roundsOfHashing,
        );

        createUserDto.password = hashedPassword;

        const _user = await this.prisma.user.create({
            data: createUserDto,
        });

        await this.prisma.userPoint.create({
            data: { point: INITIAL_POINTS, userId: _user.id },
        });

        /**
         * @description when new user is created, trigger this event to create initial/default points
         */
        const userCreatedEvent = new UserPointEvent();
        userCreatedEvent.userId = _user.id;
        userCreatedEvent.point = INITIAL_POINTS;

        this.userLogger.log('event');
        this.userLogger.log({ ...userCreatedEvent });
        this.eventEmitter.emit('point', userCreatedEvent);

        return _user;
    }

    findAll() {
        return this.prisma.user.findMany({ include: { userPoint: true } });
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id }, include: { userPoint: true } });
    }

    async update(id: number, updateUserDto: CreateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(
                updateUserDto.password,
                roundsOfHashing,
            );
        }

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}