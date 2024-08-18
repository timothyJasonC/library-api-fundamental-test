import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'BK001' }) 
  code: string;

  @ApiProperty({ example: 'The Great Gatsby' })
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  author: string;

  @ApiProperty({ example: 10 })
  stock: number;
}

export class BorrowBookDto {
  @ApiProperty({ example: 'MB001' })
  memberCode: string;

  @ApiProperty({ example: 'BK001' })
  bookCode: string;
}
