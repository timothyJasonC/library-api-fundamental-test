import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BorrowedBookDocument = BorrowedBook & Document;

@Schema()
export class BorrowedBook {
  @Prop({ required: true })
  memberCode: string

  @Prop({ required: true })
  bookCode: string

  @Prop({ required: true })
  borrowedAt: Date
}

export const BorrowedBookSchema = SchemaFactory.createForClass(BorrowedBook)
