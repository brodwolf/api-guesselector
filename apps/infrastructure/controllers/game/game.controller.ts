import { IController } from '@domain/contracts/controller.interface';
import { JWTAuthStrategy } from '@infrastructure/guard/JWTAuthStrategy';
import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { Body, Controller, HttpStatus, Inject, Injectable, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICreateGameUseCase } from '@usecases/game/create.usecase';
import { Response } from 'express';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
@ApiTags('Game')
@Controller('game')
@UseGuards(JWTAuthStrategy)
@ApiResponse({ status: 500, description: 'Internal error' })
export class GameController implements IController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_GAME_USECASES_PROXY)
    private readonly createGameUsecase: ICreateGameUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBody({ type: CreateGameDto })
  async create(@Body() createUserDto: CreateGameDto, @Res() response: Response): Promise<void> {
    await this.createGameUsecase.execute(createUserDto);
    response.status(HttpStatus.CREATED).json({});
  }
}
