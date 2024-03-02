import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssetDto } from './dto';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}
  async addToWalletOrUpdate(
    user: User,
    asset: AssetDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const userWithWallet = await this.prisma.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          wallet: {
            include: {
              assets: true,
            },
          },
        },
      });

      if (!userWithWallet || !userWithWallet.wallet) {
        return {
          success: false,
          message: 'User wallet not found.',
        };
      }

      const wallet = userWithWallet.wallet;

      const existingAsset = wallet.assets.find(
        (a) => a.symbol === asset.symbol,
      );

      if (existingAsset) {
        const totalQuantity = existingAsset.quantity + asset.quantity;
        const totalValue =
          existingAsset.value * existingAsset.quantity +
          asset.value * asset.quantity;
        const averagePrice = totalValue / totalQuantity;

        await this.prisma.asset.update({
          where: {
            symbol: existingAsset.symbol,
          },
          data: {
            quantity: totalQuantity,
            value: totalValue,
            averagePrice: averagePrice,
          },
        });

        return {
          success: true,
          message: 'Asset quantity updated successfully.',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add asset to wallet.',
      };
    }
  }
}
