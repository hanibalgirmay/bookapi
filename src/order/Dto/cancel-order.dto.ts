



import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CancelOrderDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsNumber()
    @ApiProperty()
    userId: number;
}