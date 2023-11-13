import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto';

const mockBookService = {
    createBook: jest.fn(),
    getAllBooks: jest.fn(),
    getBookById: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
    destroyBook: jest.fn(),
};

describe('BookController', () => {
    let controller: BookController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookController],
            providers: [
                {
                    provide: BookService,
                    useValue: mockBookService,
                },
            ],
        }).compile();

        controller = module.get<BookController>(BookController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createBook', () => {
        it('should create a new book', async () => {
            const mockBookData: CreateBookDto = {
                title: 'Test Book',
                ISBN: '1234567890',
            };

            await controller.createBook(mockBookData);

            expect(mockBookService.createBook).toHaveBeenCalledWith(mockBookData);
        });
    });

    describe('getAllBooks', () => {
        it('should return an array of books', async () => {
            const mockBooks = [{}, {}, {}];

            mockBookService.getAllBooks.mockResolvedValue(mockBooks);

            const result = await controller.getAllBooks();

            expect(result).toEqual(mockBooks);
        });
    });

    describe('getBookById', () => {
        it('should return a book by id', async () => {
            const mockBookId = '1';
            const mockBook = {};

            mockBookService.getBookById.mockResolvedValue(mockBook);

            const result = await controller.getBookById(mockBookId);

            expect(result).toEqual(mockBook);
        });

        it('should throw NotFoundException if book with given id is not found', async () => {
            const mockBookId = '1';

            mockBookService.getBookById.mockRejectedValue(new NotFoundException());

            await expect(controller.getBookById(mockBookId)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('updateBook', () => {
        it('should update a book by id', async () => {
            const mockBookId = '1';
            const mockBookData: UpdateBookDto = {
                title: 'Updated Book',
            };

            await controller.updateBook(mockBookId, mockBookData);

            expect(mockBookService.updateBook).toHaveBeenCalledWith(+mockBookId, mockBookData);
        });
    });

    describe('deleteBook', () => {
        it('should delete a book by id', async () => {
            const mockBookId = '1';

            await controller.deleteBook(mockBookId);

            expect(mockBookService.deleteBook).toHaveBeenCalledWith(+mockBookId);
        });
    });

    describe('destroyBook', () => {
        it('should permanently delete a book by id', async () => {
            const mockBookId = '1';

            await controller.destroyBook(mockBookId);

            expect(mockBookService.destroyBook).toHaveBeenCalledWith(+mockBookId);
        });
    });
});
