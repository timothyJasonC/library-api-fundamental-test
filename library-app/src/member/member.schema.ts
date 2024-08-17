import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document

@Schema()
export class Member {

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  code: string

  @Prop({ type: Date, default: null })
  penalizedUntil: Date | null
}

export const MemberSchema = SchemaFactory.createForClass(Member)
