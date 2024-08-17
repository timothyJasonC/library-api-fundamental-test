import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { MembersService } from 'src/member/member.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
  ) { }

  @Get()
  findAllBooks() {
    return this.booksService.findAllBooks()
  }

  @Get('available')
  findAvailableBooks() {
    return this.booksService.findAvailableBooks()
  }

  @Post('create')
  async createBook(@Body() body) {
    const { code, title, author, stock } = body
    try {
      const newBook = await this.booksService.createBooks({ code, title, author, stock })
      return newBook
    } catch (error) {
      return { error, message: 'something went wrong' }
    }
  }

  @Post('borrow')
  async borrowBook(@Body() body) {
    const { memberCode, bookCode } = body
    const message = this.booksService.borrowBook(memberCode, bookCode)
    return message
  }

  @Post('return')
  async returnBook(@Body() body) {
    const { memberCode, bookCode } = body
    const message= this.booksService.returnBook(memberCode, bookCode)
    return message
  }
}
