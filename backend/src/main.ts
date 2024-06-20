import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './utils/ValidationPipe/validation.pipe';
import { UnknownExceptionFilter } from './utils/Filters/UnknownExceptionFilter.filter';
import { PrismaExceptionFilter } from './utils/Filters/sql-exception.filter';
``
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new UnknownExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
