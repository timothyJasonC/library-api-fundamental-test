import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from './member.schema';
import { Model } from 'mongoose';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  findAllMembers() {
    return this.memberModel.find()
  }

  async penalizeMember(memberCode: string): Promise<void> {
    const member = await this.memberModel.findOne({ code: memberCode });
    if (!member) throw new NotFoundException('Member not found');
    
    const penalizedUntil = new Date();
    penalizedUntil.setDate(penalizedUntil.getDate() + 3);
  
    member.penalizedUntil = penalizedUntil;
    await member.save();
  }
  

}
