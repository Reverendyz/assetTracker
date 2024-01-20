import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [WalletController],
  providers: [WalletService, PrismaClient]
})
export class WalletModule {}
