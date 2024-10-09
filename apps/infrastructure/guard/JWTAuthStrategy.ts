import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class JWTAuthStrategy implements CanActivate {
  constructor(
    protected readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const res = context.switchToHttp().getResponse<Response>();
    const auth = context.switchToHttp().getRequest().headers.authorization;

    if (!auth || auth.split(' ')[0] !== 'Bearer') {
      res.set('WWW-Authenticate', 'Bearer realm=Bearer');
      throw new UnauthorizedException();
    }

    return this.isAuthenticated(auth.split(' ')[1]);
  };

  public isAuthenticated(access_token: string): boolean {
    try {
      this.jwtService.verify(access_token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
