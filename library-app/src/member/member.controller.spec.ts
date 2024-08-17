import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './member.service';

describe('MemberService', () => {
  let service: MembersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
