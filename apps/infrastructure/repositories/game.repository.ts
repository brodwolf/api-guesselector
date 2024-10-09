import { GameEntity } from '@domain/entities/game.entity';
import { IGameRepository } from '@domain/repository/game.interface';
import { CreateGameDto } from '@infrastructure/controllers/game/dto/create-game.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseGameRepository implements IGameRepository {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {}

  /**
   * Create a new game
   *
   * @param {CreateGameDto} createGameDto
   *
   * @returns {Promise<GameEntity>}
   */
  public async create(createGameDto: CreateGameDto): Promise<GameEntity> {
    return this.gameRepository.save(new GameEntity(createGameDto));
  }
}
