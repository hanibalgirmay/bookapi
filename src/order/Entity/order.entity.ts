import { ApiProperty } from "@nestjs/swagger";
import { Order } from "@prisma/client";

export class OrderEntity implements Order {
    @ApiProperty()
    price: number;

    @ApiProperty()
    id: number;

    @ApiProperty()
    bookId: number;

    @ApiProperty()
    userId: number;
}
