import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { FingerPrintController } from './fingerprint/fingerprint.controller';
import { UserController } from './user/user.controller';
import { GameController } from './game/game.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, FingerPrintController, AuthController, GameController],
})
export class ControllersModule {}
