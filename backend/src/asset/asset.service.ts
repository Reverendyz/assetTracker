import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssetDto } from './dto';

@Injectable()
export class AssetService {
    constructor(
        private prisma: PrismaService,
    ){}
    async addToWallet(user: User, asset: AssetDto){
        const value = Number(asset.value)
        const wallet = await this.prisma.wallet.findUnique({
            where: {
                userId: user.id,
            },
        })

        const newAsset = await this.prisma.asset.create({
            data: {
                name: asset.name,
                symbol: asset.symbol,
                value: value,
                quantity: 1,
                wallets: {
                    connect: {
                        id: wallet.id
                    }
                }
            }
        })
    }
}
