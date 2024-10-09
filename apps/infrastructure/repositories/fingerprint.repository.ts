import { FingerPrintEntity } from '@domain/entities/fingerprint.entity';
import { IFingerPrintRepository } from '@domain/repository/fingerprint.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseFingerPrintRepository implements IFingerPrintRepository {
  constructor(
    @InjectRepository(FingerPrintEntity)
    private readonly fingerPrintRepository: Repository<FingerPrintEntity>,
  ) {}

  /**
   * Create a new fingerprint
   *
   * @param {FingerPrintEntity} fingerPrintEntity
   *
   * @returns {Promise<FingerPrintEntity>}
   */
  public async create(fingerPrintEntity: FingerPrintEntity): Promise<FingerPrintEntity> {
    return this.fingerPrintRepository.save(new FingerPrintEntity(fingerPrintEntity));
  }
}
