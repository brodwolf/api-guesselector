import { Module } from '@nestjs/common';
import { ThrottlerModule as ThrottlerModulePackage } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModulePackage.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
})
export class ThrottlerModule {}
