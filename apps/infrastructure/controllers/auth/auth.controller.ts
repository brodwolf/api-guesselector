import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { Body, Controller, HttpStatus, Inject, Injectable, Post, Res } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthLoginUseCase } from '@usecases/auth/login.usecase';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Injectable()
@ApiTags('Auth')
@Controller('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.AUTH_LOGIN_USECASES_PROXY)
    private readonly authLoginUsecase: IAuthLoginUseCase,
  ) {}

  @Post('login')
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  @ApiBody({ type: LoginDto })
  async create(@Body() loginDto: LoginDto, @Res() response: Response): Promise<void> {
    const jwt_token = await this.authLoginUsecase.execute(loginDto);
    response.status(HttpStatus.CREATED).json({ access_token: jwt_token });
  }
}
