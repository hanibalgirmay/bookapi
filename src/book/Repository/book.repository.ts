import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from '../Dto/create-book.dto';
import { Book } from '@prisma/client';


@Injectable()
export class BookRepository {
    constructor(private prismaService: PrismaService) { }

    findOne(id: number): Promise<Book | null> {
        return this.prismaService.book.findUnique({ where: { id } });
    }

    findAll(): Promise<Book[]> {
        return this.prismaService.book.findMany();
    }

    create(createBookDto: CreateBookDto): Promise<Book> {
        return this.prismaService.book.create({
            data: createBookDto,
        });
    }
}