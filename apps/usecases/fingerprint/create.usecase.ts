import { IUseCase } from '@domain/contracts/usecase.interface';
import { IFingerPrintRepository } from '@domain/repository/fingerprint.interface';
import { IGeolocationRepository } from '@domain/repository/geolocation.interface';
import { CreateFingerPrintDto } from '@infrastructure/controllers/fingerprint/dto/create-fingerprint.dto';
import { toLong } from 'ip';
import { ILogger } from '../../domain/logger/logger.interface';

export type ICreateFingerPrintUseCase = IUseCase<CreateFingerPrintDto, void>;

export class CreateFingerPrintUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly fingerPrintRepository: IFingerPrintRepository,
    private readonly geolocationRepository: IGeolocationRepository,
  ) {}

  async execute({ external_id, ip }: CreateFingerPrintDto): Promise<void> {
    const country = await this.geolocationRepository.getCountryByIp(toLong(ip));

    if (!country) {
      this.logger.warn(`${this.constructor.name} execute`, `Country not found for ip ${ip}`);
    }

    const result = await this.fingerPrintRepository.create({ external_id, ...country });
    this.logger.log(`${this.constructor.name} execute`, `Fingerprint ${result.external_id} have been inserted`);
  }
}
