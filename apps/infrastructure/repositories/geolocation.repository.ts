import { GeolocationEntity } from '@domain/entities/geolocation.entity';
import { IGeolocationRepository } from '@domain/repository/geolocation.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm/repository/MongoRepository';

@Injectable()
export class DatabaseGeolocationRepository implements IGeolocationRepository {
  constructor(
    @InjectRepository(GeolocationEntity)
    private readonly geolocationRepository: MongoRepository<GeolocationEntity>,
  ) {}

  /**
   * Get a geolocation by ip range
   *
   * @param {number} ip
   *
   * @returns {Promise<GeolocationEntity>}
   */
  public async getCountryByIp(ip: number): Promise<GeolocationEntity> {
    return this.geolocationRepository.findOne({
      select: ['acronym', 'city', 'region', 'country'],
      where: {
        start_range: { $lte: ip },
        end_range: { $gte: ip },
      },
    });
  }
}
