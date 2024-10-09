import { DeleteResult } from 'typeorm';

export interface IRepository<T> {
  create?(data: Partial<T>): Promise<T>;
  get?(external_id: string): Promise<T>;
  list?(...params: any): Promise<[T[], number]>;
  update?(external_id: string, data: Partial<T>): Promise<T>;
  delete?(external_id: string): Promise<DeleteResult>;
}
