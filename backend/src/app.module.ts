import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { WalletModule } from './wallet/wallet.module';
import { AssetController } from './asset/asset.controller';
import { AssetService } from './asset/asset.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UserModule, AuthModule, PrismaModule, WalletModule],
  controllers: [AssetController, AppController],
  providers: [AssetService],
})
export class AppModule {}
