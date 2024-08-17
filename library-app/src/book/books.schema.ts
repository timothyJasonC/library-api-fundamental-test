import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document

@Schema()
export class Book {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  author: string

  @Prop({ required: true })
  code: string

  @Prop({ default: 1 })
  stock: number
}

export const BookSchema = SchemaFactory.createForClass(Book)
