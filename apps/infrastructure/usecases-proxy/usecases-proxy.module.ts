import { DynamicModule, Module } from '@nestjs/common';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';

import { RepositoriesModule } from '../repositories/repositories.module';

import { ILogger } from '@domain/logger/logger.interface';
import { IUserRepository } from '@domain/repository/customer.interface';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { DatabaseFingerPrintRepository } from '@infrastructure/repositories/fingerprint.repository';
import { DatabaseGeolocationRepository } from '@infrastructure/repositories/geolocation.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginUseCase } from '@usecases/auth/login.usecase';
import { CreateFingerPrintUseCase } from '@usecases/fingerprint/create.usecase';
import { CreateUserUseCase } from '@usecases/user/create.usecase';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { LoggerService } from '../logger/logger.service';
import { DatabaseUserRepository } from '../repositories/user.repository';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  // User
  static CREATE_USER_USECASES_PROXY = 'createUserUsecaseProxy';

  // Authenticate
  static AUTH_LOGIN_USECASES_PROXY = 'authLoginUserUsecaseProxy';

  // Fingerprint
  static CREATE_FINGERPINT_USECASES_PROXY = 'createFingerPrintUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, DatabaseUserRepository, EnvironmentConfigService],
          provide: UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
            environmentConfigService: EnvironmentConfigService,
          ) => new CreateUserUseCase(logger, userRepository, environmentConfigService),
        },
        {
          inject: [LoggerService, DatabaseFingerPrintRepository, DatabaseGeolocationRepository],
          provide: UsecasesProxyModule.CREATE_FINGERPINT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            fingerprintRepository: DatabaseFingerPrintRepository,
            geolocationRepository: DatabaseGeolocationRepository,
          ) => new CreateFingerPrintUseCase(logger, fingerprintRepository, geolocationRepository),
        },
        {
          inject: [LoggerService, JwtService, DatabaseUserRepository, EnvironmentConfigService],
          provide: UsecasesProxyModule.AUTH_LOGIN_USECASES_PROXY,
          useFactory: (
            logger: ILogger,
            jwtService: JwtService,
            userRepository: IUserRepository,
            environmentConfigService: EnvironmentConfigService,
          ) => new AuthLoginUseCase(logger, jwtService, userRepository, environmentConfigService),
        },
      ],
      exports: [
        UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
        UsecasesProxyModule.AUTH_LOGIN_USECASES_PROXY,
        UsecasesProxyModule.CREATE_FINGERPINT_USECASES_PROXY,
      ],
    };
  }
}
