import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Book } from "@prisma/client";
import { isNumberString } from "class-validator";
import { ReasonPhrases } from "http-status-codes";
import { BookService } from "./book.service";
import { CreateBookDto, UpdateBookDto } from "./dto";

@Controller('Books')
@ApiTags('Books')
export class BookController {

    constructor(private readonly service: BookService) { }

    @Post()
    @ApiCreatedResponse({ description: ReasonPhrases.CREATED })
    @ApiOperation({ summary: 'Create a new book' })
    async createBook(@Body() data: CreateBookDto): Promise<Book> {
        return await this.service.createBook(data);
    }

    @Get()
    @ApiOkResponse({ description: ReasonPhrases.OK })
    @ApiOperation({ summary: 'Get all books' })
    async getAllBooks(): Promise<Book[]> {
        return await this.service.getAllBooks();
    }

    @Get(':id')
    @ApiOkResponse({ description: ReasonPhrases.OK })
    @ApiOperation({ summary: 'Get a book by id' })
    async getBookById(@Param('id') id: string): Promise<Book> {
        this.checkId(id);
        return await this.service.getBookById(+id);
    }

    @Patch(':id')
    @ApiOkResponse({ description: ReasonPhrases.OK })
    @ApiOperation({ summary: 'Update a book' })
    async updateBook(@Param('id') id: string, @Body() data: UpdateBookDto): Promise<Book> {
        this.checkId(id);
        return await this.service.updateBook(+id, data);
    }

    @Delete(':id')
    @ApiOkResponse({ description: ReasonPhrases.OK })
    @ApiOperation({ summary: 'Delete a book' })
    async deleteBook(@Param('id') id: string): Promise<void> {
        this.checkId(id);
        await this.service.deleteBook(+id);
    }

    @Delete('destroy/:id')
    @ApiOkResponse({ description: ReasonPhrases.OK })
    @ApiOperation({ summary: 'Permanently delete a book' })
    async destroyBook(@Param('id') id: string): Promise<void> {
        this.checkId(id);
        await this.service.destroyBook(+id);
    }

    private checkId(id: string): void {
        if (!isNumberString(id)) {
            throw new BadRequestException([{ field: 'id', message: `Id must be a number string` }]);
        }
    }
}