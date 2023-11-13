import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Book, PrismaClient } from '@prisma/client';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto';

const mockPrisma = {
    book: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findFirst: jest.fn(),
    },
};

describe('BookService', () => {
    let bookService: BookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                {
                    provide: PrismaClient,
                    useValue: mockPrisma,
                },
            ],
        }).compile();

        bookService = module.get<BookService>(BookService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createBook', () => {
        it('should create a new book', async () => {
            const mockBookData = {
                title: 'Test Book',
                ISBN: '1234567890',
            } as CreateBookDto;

            mockPrisma.book.findFirst.mockResolvedValue(null);

            await bookService.createBook(mockBookData);

            expect(mockPrisma.book.create).toHaveBeenCalledWith({
                data: mockBookData,
            });
        });

        it('should throw ConflictException if book with the same ISBN already exists', async () => {
            const mockBookData = {
                title: 'Test Book',
                ISBN: '1234567890',
            };

            mockPrisma.book.findFirst.mockResolvedValue({});

            await expect(bookService.createBook(mockBookData)).rejects.toThrowError(ConflictException);
        });
    });

    describe('getAllBooks', () => {
        it('should return an array of books', async () => {
            const mockBooks = [{}, {}, {}] as Book[];

            mockPrisma.book.findMany.mockResolvedValue(mockBooks);

            const result = await bookService.getAllBooks();

            expect(result).toEqual(mockBooks);
        });
    });

    describe('getBookById', () => {
        it('should return a book by id', async () => {
            const mockBookId = 1;
            const mockBook = { id: mockBookId, title: 'Test Book', ISBN: '1234567890' } as Book;

            mockPrisma.book.findUnique.mockResolvedValue(mockBook);

            const result = await bookService.getBookById(mockBookId);

            expect(result).toEqual(mockBook);
        });

        it('should throw NotFoundException if book with given id is not found', async () => {
            const mockBookId = 1;

            mockPrisma.book.findUnique.mockResolvedValue(null);

            await expect(bookService.getBookById(mockBookId)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('updateBook', () => {
        it('should update a book by id', async () => {
            const mockBookId = 1;
            const mockBookData = { title: 'Updated Book', ISBN: '0987654321' } as UpdateBookDto;

            mockPrisma.book.findUnique.mockResolvedValue({ id: mockBookId, title: 'Original Book', ISBN: '1234567890' });

            await bookService.updateBook(mockBookId, mockBookData);

            expect(mockPrisma.book.update).toHaveBeenCalledWith({
                where: { id: mockBookId },
                data: mockBookData,
            });
        });

        it('should throw NotFoundException if book with given id is not found', async () => {
            const mockBookId = 1;

            mockPrisma.book.findUnique.mockResolvedValue(null);

            await expect(bookService.updateBook(mockBookId, {})).rejects.toThrowError(NotFoundException);
        });
    });

    describe('deleteBook', () => {
        it('should delete a book by id', async () => {
            const mockBookId = 1;

            mockPrisma.book.findUnique.mockResolvedValue({ id: mockBookId, title: 'Test Book', ISBN: '1234567890' });

            await bookService.deleteBook(mockBookId);

            expect(mockPrisma.book.update).toHaveBeenCalledWith({
                where: { id: mockBookId },
                data: { deletedAt: expect.any(Date) },
            });
        });

        it('should throw NotFoundException if book with given id is not found', async () => {
            const mockBookId = 1;

            mockPrisma.book.findUnique.mockResolvedValue(null);

            await expect(bookService.deleteBook(mockBookId)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('destroyBook', () => {
        it('should permanently delete a book by id', async () => {
            const mockBookId = 1;

            mockPrisma.book.findUnique.mockResolvedValue({ id: mockBookId, title: 'Test Book', ISBN: '1234567890' });

            await bookService.destroyBook(mockBookId);

            expect(mockPrisma.book.delete).toHaveBeenCalledWith({
                where: { id: mockBookId },
            });
        });

        it('should throw NotFoundException if book with given id is not found', async () => {
            const mockBookId = 1;

            mockPrisma.book.findUnique.mockResolvedValue(null);

            await expect(bookService.destroyBook(mockBookId)).rejects.toThrowError(NotFoundException);
        });
    });
});

