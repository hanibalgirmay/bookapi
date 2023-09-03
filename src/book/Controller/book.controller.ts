import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Inject } from '@nestjs/common';
import { BookService } from '../Service/book.service';
import { CreateBookDto } from '../Dto/create-book.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from '../Entity/book.entity';
import { JwtAuthGuard } from 'src/auth/Guard/jwt.auth.guard';
import { ClientProxy } from '@nestjs/microservices';

@Controller('book')
@ApiTags('Book')
export class BookController {
    constructor(
        // @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
        private bookService: BookService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: BookEntity, isArray: true })
    books() {
        const books = this.bookService.findAll();
        // this.client.send('getBooks', books);

        return books;
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: BookEntity })
    book(@Param('id', ParseIntPipe) id: number) {
        const book = this.bookService.findOne(id)
        // this.client.send('getBook', book);

        return book;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ type: BookEntity })
    createBook(@Body() body: CreateBookDto) {
        const newBook = this.bookService.create(body);
        // this.client.send('newBook', newBook);

        return newBook;
    }
}
