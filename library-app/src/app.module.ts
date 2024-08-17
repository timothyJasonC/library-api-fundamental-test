import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersController } from './member/member.controller';
import { BooksController } from './book/books.controller';
import { MembersService } from './member/member.service';
import { BooksService } from './book/books.service';
import { Book, BookSchema } from './book/books.schema';
import { BorrowedBook, BorrowedBookSchema } from './book/borrowedBook.schema';
import { SeederService } from './seeder/seeder.service';
import { Member, MemberSchema } from './member/member.schema';
//test

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    // MongoDB connection using Mongoose
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema }, 
      { name: BorrowedBook.name, schema: BorrowedBookSchema },
      { name: Member.name, schema: MemberSchema },
    ]),
  ],
  controllers: [AppController, MembersController, BooksController],
  providers: [AppService, MembersService, BooksService, SeederService],
})
export class AppModule {}
