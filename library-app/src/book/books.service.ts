import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './books.schema';
import { BorrowedBook, BorrowedBookDocument } from './borrowedBook.schema';
import { Member, MemberDocument } from 'src/member/member.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(BorrowedBook.name) private borrowedBookModel: Model<BorrowedBookDocument>,
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) { }

  // Create book
  async createBooks(bookData: Partial<Book>): Promise<Book> {
    const newBook = new this.bookModel(bookData)
    return newBook.save()
  }

  // Get all books
  async findAllBooks(): Promise<Book[]> {
    return this.bookModel.find()
  }

  // Get available books (not borrowed)
  async findAvailableBooks(): Promise<Book[]> {
    const borrowedBooks = await this.borrowedBookModel.find()
    const borrowedBookCodes = borrowedBooks.map(b => b.bookCode)

    return this.bookModel.find({ code: { $nin: borrowedBookCodes } })
  }

  async borrowBook(memberCode: string, bookCode: string) {
    const member = await this.memberModel.findOne({ code: memberCode })
    if (!member) throw new NotFoundException('Member not found')
  
    // Cek apakah member masih dalam masa penalti
    if (member.penalizedUntil && new Date(member.penalizedUntil) > new Date()) {
      throw new BadRequestException(`Member is penalized until ${member.penalizedUntil}`)
    }
  
    const book = await this.bookModel.findOne({ code: bookCode })
    if (!book) throw new NotFoundException('Book not found')
  
    const borrowedCount = await this.borrowedBookModel.countDocuments({ memberCode })
    if (borrowedCount >= 2) throw new BadRequestException('Cannot borrow more than 2 books')
  
    const isBookBorrowed = await this.borrowedBookModel.findOne({ bookCode })
    if (isBookBorrowed) throw new BadRequestException('Book is already borrowed')
  
    // Proses peminjaman buku
    await this.borrowedBookModel.create({ memberCode, bookCode, borrowedAt: new Date() })
    await this.bookModel.updateOne({ code: bookCode }, { $inc: { stock: -1 } })
    return {message: 'Book borrowed successfully'}
  }
  
  async returnBook(memberCode: string, bookCode: string) {
    const borrowedBook = await this.borrowedBookModel.findOne({ memberCode, bookCode })
    if (!borrowedBook) throw new NotFoundException('Book not borrowed by this member')
  
    const borrowedDuration = (new Date().getTime() - new Date(borrowedBook.borrowedAt).getTime()) / (1000 * 3600 * 24)
  
    await this.borrowedBookModel.deleteOne({ memberCode, bookCode })
    await this.bookModel.updateOne({ code: bookCode }, { $inc: { stock: 1 } })
  
    // Penalti anggota jika buku dikembalikan lebih dari 7 hari
    if (borrowedDuration > 7) {
      const penalizedUntil = new Date()
      penalizedUntil.setDate(penalizedUntil.getDate() + 3); // Penalti 3 hari
  
      await this.memberModel.updateOne(
        { code: memberCode },
        { penalizedUntil }
      )
  
      throw new BadRequestException(`Late return. You are penalized for 3 days until ${penalizedUntil}`)
    }
    return {message: 'Book returned successfully'}
  }
}
