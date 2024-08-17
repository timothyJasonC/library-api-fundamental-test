import { Controller, Get } from '@nestjs/common';
import { MembersService } from './member.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAllMembers() {
    return this.membersService.findAllMembers()
  }
}
