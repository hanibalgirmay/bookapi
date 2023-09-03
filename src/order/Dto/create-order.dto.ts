import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @ApiProperty()
    userId: number;

    @IsNumber()
    @ApiProperty()
    bookId: number;
}