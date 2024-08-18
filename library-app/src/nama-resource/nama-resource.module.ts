import { Module } from '@nestjs/common';
import { NamaResourceService } from './nama-resource.service';
import { NamaResourceController } from './nama-resource.controller';

@Module({
  controllers: [NamaResourceController],
  providers: [NamaResourceService],
})
export class NamaResourceModule {}
