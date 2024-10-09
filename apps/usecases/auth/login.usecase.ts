import { IAuthInternalToken } from '@domain/contracts/jwt.interface';
import { IUseCase } from '@domain/contracts/usecase.interface';
import { IUserRepository } from '@domain/repository/customer.interface';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { LoginDto } from '@infrastructure/controllers/auth/dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { ILogger } from '../../domain/logger/logger.interface';

export type IAuthLoginUseCase = IUseCase<LoginDto, string>;

export class AuthLoginUseCase {
  constructor(
    private readonly logger: ILogger,
    protected readonly jwtService: JwtService,
    private readonly userRepository: IUserRepository,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async execute({ login, password }: LoginDto): Promise<string> {
    const salt = this.environmentConfigService.getAppSaltSufix();
    password = crypto
      .createHash('md5')
      .update(password + salt)
      .digest('hex');

    const user = await this.userRepository.authenticate(login, password);

    if (!user) {
      this.logger.warn(`${this.constructor.name} execute`, 'Invalid login or password');
      throw new UnauthorizedException('Invalid login or password');
    }

    return this.generateInternalToken({
      name: user.name,
      mail: user.mail,
      external_id: user.external_id,
    });
  }

  /**
   * Generate the JWT for internal Use.
   *
   * @param  {IAuthInternalToken} payload
   *
   * @returns {string}
   */
  public generateInternalToken(payload: IAuthInternalToken): string {
    return this.jwtService.sign(payload, { secret: this.environmentConfigService.getJwtSecret(), expiresIn: '7d' });
  }
}
