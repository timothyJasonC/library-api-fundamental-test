import { Controller, Get } from '@nestjs/common';
import { TestService } from './nama-resource.service';

@Controller('nama-resource')
export class NamaResourceController {
  constructor(private readonly TestService: TestService) {}
  @Get()
  getHello(): string {
    return this.TestService.getHello();
  }
}
