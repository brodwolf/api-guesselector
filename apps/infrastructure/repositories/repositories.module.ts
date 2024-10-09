import { FingerPrintEntity } from '@domain/entities/fingerprint.entity';
import { GeolocationEntity } from '@domain/entities/geolocation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { DatabaseFingerPrintRepository } from './fingerprint.repository';
import { DatabaseGeolocationRepository } from './geolocation.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FingerPrintEntity, GeolocationEntity])],
  providers: [DatabaseUserRepository, DatabaseFingerPrintRepository, DatabaseGeolocationRepository],
  exports: [DatabaseUserRepository, DatabaseFingerPrintRepository, DatabaseGeolocationRepository],
})
export class RepositoriesModule {}
