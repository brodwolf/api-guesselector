import { IUseCase } from '@domain/contracts/usecase.interface';
import { IGameRepository } from '@domain/repository/game.interface';
import { CreateGameDto } from '@infrastructure/controllers/game/dto/create-game.dto';
import { ILogger } from '../../domain/logger/logger.interface';

export type ICreateGameUseCase = IUseCase<CreateGameDto, void>;

export class CreateGameUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly gameRepository: IGameRepository,
  ) {}

  async execute(createGameDto: CreateGameDto): Promise<void> {
    const result = await this.gameRepository.create(createGameDto);
    this.logger.log(`${this.constructor.name} execute`, `Game ${result.external_id} have been inserted`);
  }
}
