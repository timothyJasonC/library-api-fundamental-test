import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BorrowBookDto, CreateBookDto } from './book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of books retrieved successfully' })
  findAllBooks() {
    return this.booksService.findAllBooks();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available books' })
  @ApiResponse({ status: 200, description: 'List of available books retrieved successfully' })
  findAvailableBooks() {
    return this.booksService.findAvailableBooks();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: CreateBookDto }) // Body request dokumentasi
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  async createBook(@Body() body: CreateBookDto) {
    const { code, title, author, stock } = body;
    try {
      const newBook = await this.booksService.createBooks({ code, title, author, stock });
      return newBook;
    } catch (error) {
      return { error, message: 'something went wrong' };
    }
  }

  @Post('borrow')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({ type: BorrowBookDto })
  @ApiResponse({ status: 200, description: 'Book borrowed successfully' })
  @ApiResponse({ status: 404, description: 'Member not found / Book not found' })
  @ApiResponse({ status: 400, description: `Cannot borrow more than 2 books / Book is already borrowed / Member is penalized until ...` })
  async borrowBook(@Body() body: BorrowBookDto) {
    const { memberCode, bookCode } = body;
    const message = await this.booksService.borrowBook(memberCode, bookCode);
    return message;
  }

  @Post('return')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiBody({ type: BorrowBookDto })
  @ApiResponse({ status: 200, description: 'Book returned successfully' })
  @ApiResponse({ status: 404, description: 'Book not borrowed by this member' })
  @ApiResponse({ status: 400, description: `Late return. You are penalized for 3 days until ...` })
  async returnBook(@Body() body: BorrowBookDto) {
    const { memberCode, bookCode } = body;
    const message = await this.booksService.returnBook(memberCode, bookCode);
    return message;
  }
}
