import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from '../Dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedListener } from '../Events/user-created-listener';
import { INITIAL_POINTS } from 'src/utils/Constant';
import { UserPointEvent } from '../Events/user-point.event';
import { UserRepository } from '../Repository/user.respository';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    create(createUserDto: CreateUserDto) {
        return this.userRepository.create(createUserDto);
    }

    findAll() {
        return this.userRepository.findAll();
    }

    findOne(id: number) {
        return this.userRepository.findOne(id);
    }

    update(id: number, updateUserDto: CreateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.userRepository.remove(id);
    }

}
