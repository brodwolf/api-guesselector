import { FingerPrintEntity } from '@domain/entities/fingerprint.entity';
import { GameEntity } from '@domain/entities/game.entity';
import { GeolocationEntity } from '@domain/entities/geolocation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { DatabaseFingerPrintRepository } from './fingerprint.repository';
import { DatabaseGameRepository } from './game.repository';
import { DatabaseGeolocationRepository } from './geolocation.repository';
import { DatabaseUserRepository } from './user.repository';

const repositories = [
  DatabaseUserRepository,
  DatabaseGameRepository,
  DatabaseFingerPrintRepository,
  DatabaseGeolocationRepository,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FingerPrintEntity, GeolocationEntity, GameEntity])],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
