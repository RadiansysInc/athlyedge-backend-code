import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Book, Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaClient) { }

    async createBook(data: Prisma.BookCreateInput): Promise<Book> {
        await this.validateISBN(data.ISBN);
        return await this.prisma.book.create({ data });
    }


    async getAllBooks(): Promise<Book[]> {
        return await this.prisma.book.findMany();
    }


    async getBookById(id: number): Promise<Book> {
        const book = await this.prisma.book.findUnique({ where: { id, deletedAt: null } });
        if (!book) {
            throw new NotFoundException([{ field: 'id', message: `Book not found with id ${id}` }]);
        }
        return book;
    }


    async updateBook(id: number, data: Prisma.BookUpdateInput): Promise<Book> {
        await this.getBookById(id);
        return await this.prisma.book.update({ where: { id }, data });
    }

    async deleteBook(id: number): Promise<void> {
        await this.getBookById(id);
        await this.prisma.book.update({ where: { id }, data: { deletedAt: new Date() } });
    }

    async destroyBook(id: number): Promise<void> {
        await this.getBookById(id);
        await this.prisma.book.delete({ where: { id } });
    }

    private async validateISBN(ISBN: string): Promise<void> {
        const book = await this.prisma.book.findFirst({ where: { ISBN, deletedAt: null } });
        if (book) {
            throw new ConflictException([{ field: 'ISBN', message: `Book already exists with ISBN ${ISBN}` }]);
        }
    }

}