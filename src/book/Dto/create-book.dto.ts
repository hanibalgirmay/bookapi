import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    writer: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    cover_image: string;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    point: number;

    @ApiProperty()
    @IsIn([$Enums.Tag.ESSAY, $Enums.Tag.FICTION, $Enums.Tag.NON_FICTION, $Enums.Tag.SCIENCE])
    tag: $Enums.Tag
}