import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Book } from "@prisma/client";

export class BookEntity implements Book {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    writer: string;

    @ApiProperty()
    cover_image: string;

    @ApiProperty()
    point: number;

    @ApiProperty()
    tag: $Enums.Tag;
}