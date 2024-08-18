import { Test, TestingModule } from '@nestjs/testing';
import { SeederService } from './seeder.service';
import { getModelToken } from '@nestjs/mongoose';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        {
          provide: getModelToken('Book'),
          useValue: {},
        },
        {
          provide: getModelToken('Member'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
