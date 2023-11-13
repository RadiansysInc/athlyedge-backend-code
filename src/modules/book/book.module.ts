import { Module } from '@nestjs/common';
import { PrismaManager, PrismaService } from 'src/prisma';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
    controllers: [BookController],
    providers: [BookService, PrismaService, PrismaManager]
})
export class BookModule { }
