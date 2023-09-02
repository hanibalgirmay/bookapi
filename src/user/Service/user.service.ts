import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from '../Dto/create.user.dto';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            roundsOfHashing,
        );

        createUserDto.password = hashedPassword;

        return this.prisma.user.create({
            data: createUserDto,
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
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