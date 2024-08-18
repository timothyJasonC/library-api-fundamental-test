import { Controller, Get } from '@nestjs/common';
import { MembersService } from './member.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Member' })
  @ApiResponse({ status: 200, description: 'List of all member' })
  findAllMembers() {
    return this.membersService.findAllMembers()
  }
}
