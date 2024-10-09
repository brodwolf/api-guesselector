import { FingerPrintEntity } from '@domain/entities/fingerprint.entity';

export type IFingerPrintRepository = {
  create(data: Partial<FingerPrintEntity>): Promise<FingerPrintEntity>;
};
