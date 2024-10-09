import { NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

/**
 * Throw a not found exception
 *
 * @param {any} id
 * @param {string} alias
 * @param {UpdateResult} updated
 *
 * @throws {NotFoundException}
 */
export const validateUpdateReturn = (updated: UpdateResult, alias: string, id: any): void => {
  if (updated.affected < 1) {
    throw new NotFoundException(`${alias} not found. Identifier: ${id}`);
  }
};

/**
 * Remove objetos nullos
 *
 * @param {any} obj
 *
 * @returns {Object}
 */
export const removeNullValues = (obj: any): any => {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));
};
