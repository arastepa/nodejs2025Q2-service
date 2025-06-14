import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LoggingService } from './logging/logging.service';
import { CustomExceptionFilter } from './logging/exception.filter';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  process.on('uncaughtException', (error) => {
    loggingService.log(`Uncaught Exception: ${error.message}`, 'error');
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.log(`Unhandled Rejection: ${reason}`, 'error');
  });
  app.useGlobalGuards(new AuthGuard(jwtService, reflector));
  app.useGlobalFilters(new CustomExceptionFilter(loggingService));
  app.useGlobalInterceptors(new LoggingInterceptor(loggingService));
  await app.listen(process.env.PORT || 4000);
  console.log('server started on port', process.env.PORT || 4000);
}
bootstrap();
