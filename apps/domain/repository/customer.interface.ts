import { UserEntity } from '@domain/entities/user.entity';

export type IUserRepository = {
  create(data: Partial<UserEntity>): Promise<UserEntity>;
  authenticate(email: string, password: string): Promise<UserEntity | null>;
};
