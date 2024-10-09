import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeormModule } from './infrastructure/config/typeorm/typeorm.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { HealthModule } from './infrastructure/health/health.module';
import { LoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    UsecasesProxyModule.register(),
    EnvironmentConfigModule,
    TypeormModule,
    HealthModule,
    ThrottlerModule,
    LoggerModule,
    ExceptionsModule,
    ControllersModule,
  ],
  providers: [],
})
export class AppModule {}
