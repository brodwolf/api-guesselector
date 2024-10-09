import { IFingerPrintToken } from '@domain/contracts/jwt.interface';
import { decode, parse } from '@infrastructure/utils/jwt';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PublicSession = createParamDecorator((_: unknown, ctx: ExecutionContext): IFingerPrintToken => {
  const request = ctx.switchToHttp().getRequest();
  const { jwt } = parse(request.headers.authorization);
  return decode<IFingerPrintToken>(jwt);
});
