import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ValidISBN } from "src/common/rules/app.rule";

export class CreateBookDto {
    @ApiProperty({ description: 'The title of the book', example: 'Test Book' })
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MaxLength(120)
    readonly title: string;

    @ApiProperty({ description: 'ISBN of book', example: '9876543210' })
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MaxLength(20)
    @ValidISBN()
    readonly ISBN: string;
}