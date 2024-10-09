import { IUseCase } from '@domain/contracts/usecase.interface';
import { IUserRepository } from '@domain/repository/customer.interface';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { CreateUserDto } from '@infrastructure/controllers/user/dto/create-user.dto';
import * as crypto from 'crypto';
import { ILogger } from '../../domain/logger/logger.interface';

export type ICreateUserUseCase = IUseCase<CreateUserDto, void>;

export class CreateUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async execute({ name, mail, login, password }: CreateUserDto): Promise<void> {
    const salt = this.environmentConfigService.getAppSaltSufix();
    password = crypto
      .createHash('md5')
      .update(password + salt)
      .digest('hex');

    const result = await this.userRepository.create({ name, mail, login, password });
    this.logger.log(`${this.constructor.name} execute`, `User ${result.external_id} have been inserted`);
  }
}
