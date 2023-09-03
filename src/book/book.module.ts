import { Module } from '@nestjs/common';
import { BookService } from './Service/book.service';
import { BookController } from './Controller/book.controller';
import { PrismaService } from 'src/prisma.service';
import { BookRepository } from './Repository/book.repository';

@Module({
  imports: [
  ],
  providers: [BookService, BookRepository, PrismaService],
  controllers: [BookController]
})
export class BookModule { }
