import { IUserRepository } from '@domain/repository/customer.interface';
import { CreateUserDto } from '@infrastructure/controllers/user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Create a new user
   *
   * @param {CreateUserDto} createUserDto
   *
   * @returns {Promise<UserEntity>}
   */
  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(new UserEntity(createUserDto));
  }

  /**
   * Get a user by its login and password
   *
   * @param {string} login
   * @param {string} password
   *
   * @returns {Promise<UserEntity | null>}
   */
  public async authenticate(login: string, password: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { login, password } });
  }
}
