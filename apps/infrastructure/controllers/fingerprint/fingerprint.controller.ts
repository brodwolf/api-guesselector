import { IController } from '@domain/contracts/controller.interface';
import { IFingerPrintToken } from '@domain/contracts/jwt.interface';
import { PublicSession } from '@domain/decorators/decorator';
import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { Controller, HttpStatus, Inject, Injectable, Post, Res } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICreateFingerPrintUseCase } from '@usecases/fingerprint/create.usecase';
import { Response } from 'express';
import { CreateFingerPrintDto } from './dto/create-fingerprint.dto';

@Injectable()
@ApiTags('Fingerprint')
@Controller('fingerprint')
@ApiResponse({ status: 500, description: 'Internal error' })
export class FingerPrintController implements IController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_FINGERPINT_USECASES_PROXY)
    private readonly createFingerPrintUseCase: ICreateFingerPrintUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBody({})
  async create(@PublicSession() session: IFingerPrintToken, @Res() response: Response): Promise<void> {
    await this.createFingerPrintUseCase.execute(new CreateFingerPrintDto(session));
    response.status(HttpStatus.CREATED).json({});
  }
}
