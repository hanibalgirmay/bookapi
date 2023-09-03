import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from '../Dto/create-book.dto';
import { BookRepository } from '../Repository/book.repository';

@Injectable()
export class BookService {
    constructor(private bookRepository: BookRepository) { }


    findOne(id: number) {
        return this.bookRepository.findOne(id);
    }

    findAll() {
        return this.bookRepository.findAll();
    }

    create(createBookDto: CreateBookDto) {
        return this.bookRepository.create(createBookDto);
    }

}

