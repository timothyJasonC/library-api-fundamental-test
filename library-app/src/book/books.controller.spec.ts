import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: {},
        },
        {
          provide: getModelToken('BorrowedBook'),
          useValue: {}, 
        },
        {
          provide: getModelToken('Member'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of books', async () => {
    // Implement test logic for returning an array of books
  });
});
