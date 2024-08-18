import { Test, TestingModule } from '@nestjs/testing';
import { NamaResourceController } from './nama-resource.controller';
import { TestService } from './nama-resource.service';

describe('NamaResourceController', () => {
  let controller: NamaResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NamaResourceController],
      providers: [TestService],
    }).compile();

    controller = module.get<NamaResourceController>(NamaResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
