import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../book/books.schema';
import { Member, MemberDocument } from '../member/member.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async seed() {
    // Book == 0 di database
    const bookCount = await this.bookModel.countDocuments()
    if (bookCount === 0) {
      await this.bookModel.insertMany([
        { code: "JK-45", title: "Harry Potter", author: "J.K Rowling", stock: 1 },
        { code: "SHR-1", title: "A Study in Scarlet", author: "Arthur Conan Doyle", stock: 1 },
        { code: "TW-11", title: "Twilight", author: "Stephenie Meyer", stock: 1 },
        { code: "HOB-83", title: "The Hobbit, or There and Back Again", author: "J.R.R. Tolkien", stock: 1 },
        { code: "NRN-7", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", stock: 1 },
      ])
      console.log('Books seeding completed!');
    } else {
      console.log('Books already exist, skipping seeding.')
    }

    // Member == 0
    const memberCount = await this.memberModel.countDocuments()
    if (memberCount === 0) {
      await this.memberModel.insertMany([
        { code: "M001", name: "Angga" },
        { code: "M002", name: "Ferry" },
        { code: "M003", name: "Putri" },
      ]);
      console.log('Members seeding completed!')
    } else {
      console.log('Members already exist, skipping seeding.')
    }
  }
}
