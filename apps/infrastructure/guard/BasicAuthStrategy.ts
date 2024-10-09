import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicAuthStrategy implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  public canActivate = async (context: ExecutionContext): Promise<boolean> => {
    if (!context.switchToHttp().getRequest().headers.authorization) {
      throw new UnauthorizedException();
    }

    const [username, password] = Buffer.from(context.switchToHttp().getRequest().headers.authorization.split(' ')[1], 'base64')
      .toString()
      .split(':');

    const HTTP_BASIC_USER = this.configService.get('BASIC_USER');
    const HTTP_BASIC_PASS = this.configService.get('BASIC_PASSWORD');

    if (HTTP_BASIC_USER === username && HTTP_BASIC_PASS === password) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
