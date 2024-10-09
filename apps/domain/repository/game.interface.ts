import { IRepository } from '@domain/contracts/repository.interface';
import { GameEntity } from '@domain/entities/game.entity';

export type IGameRepository = IRepository<GameEntity>;
