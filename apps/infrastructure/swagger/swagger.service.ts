import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';

export const setupSwagger = async (app: INestApplication) => {
  const configService = app.get(EnvironmentConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.getSwaggerSiteTitle())
    .setDescription(configService.getSwaggerDescription())
    .setVersion(configService.getSwaggerVersion())
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('docs', app, document);
};
