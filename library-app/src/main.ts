import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const seeder = app.get(SeederService);
  await seeder.seed();
}
bootstrap();
