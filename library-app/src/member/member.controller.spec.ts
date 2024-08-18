import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './member.service';
import { getModelToken } from '@nestjs/mongoose';
import { MembersController } from './member.controller';

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getModelToken('Member'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
