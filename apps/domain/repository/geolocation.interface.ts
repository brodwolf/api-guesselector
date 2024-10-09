import { GeolocationEntity } from '@domain/entities/geolocation.entity';

export type IGeolocationRepository = {
  getCountryByIp(ip: number): Promise<GeolocationEntity>;
};
