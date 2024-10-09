import { HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';
import { setupSwagger } from './infrastructure/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new LoggerService();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  // Swagger config
  setupSwagger(app);

  await app.listen(3000);

  // Use Logger Globally
  app.useLogger(logger);
}
bootstrap();
