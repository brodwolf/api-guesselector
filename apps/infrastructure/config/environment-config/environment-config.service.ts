import { AuthConfig } from '@domain/config/auth.interface';
import { JWTConfig } from '@domain/config/jwt.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'apps/domain/config/app.interface';
import { SwaggerConfig } from 'apps/domain/config/swagger.interface';
import { DatabaseConfig } from '../../../domain/config/database.interface';

@Injectable()
export class EnvironmentConfigService implements AuthConfig, JWTConfig, DatabaseConfig, SwaggerConfig, AppConfig {
  constructor(private configService: ConfigService) {}

  getBasicUser(): string {
    return this.configService.get<string>('BASIC_USER');
  }

  getBasicPassword(): string {
    return this.configService.get<string>('BASIC_PASSWORD');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getAppPort(): number {
    return this.configService.get<number>('SWAGGER_SITE_TITLE');
  }

  getAppEnvironment(): string {
    return this.configService.get<string>('SWAGGER_SITE_TITLE');
  }

  getAppSaltSufix(): string {
    return this.configService.get<string>('SALT_SUFIX');
  }

  getSwaggerSiteTitle(): string {
    return this.configService.get<string>('SWAGGER_SITE_TITLE');
  }

  getSwaggerDocumentationTitle(): string {
    return this.configService.get<string>('SWAGGER_DOC_TITLE');
  }

  getSwaggerDescription(): string {
    return this.configService.get<string>('SWAGGER_DOC_DESCRIPTION');
  }

  getSwaggerVersion(): string {
    return this.configService.get<string>('SWAGGER_DOC_VERSION');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseConnectionString(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
