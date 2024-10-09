import { IController } from '@domain/contracts/controller.interface';
import { BasicAuthStrategy } from '@infrastructure/guard/BasicAuthStrategy';
import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { Body, Controller, HttpStatus, Inject, Injectable, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICreateUserUseCase } from '@usecases/user/create.usecase';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
@ApiTags('User')
@Controller('user')
@UseGuards(BasicAuthStrategy)
@ApiResponse({ status: 500, description: 'Internal error' })
export class UserController implements IController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly createUserUsecase: ICreateUserUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response): Promise<void> {
    await this.createUserUsecase.execute(createUserDto);
    response.status(HttpStatus.CREATED).json({});
  }
}
