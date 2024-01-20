import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService){}

    getMyWallet(@GetUser() user: User){
        const userWallet = this.prisma.user.findUnique({
            where:{
                id: user.id,
            },
            select: {
                wallet: true
            }
        });
        return userWallet;
    }

    createWallet(@GetUser() user: User){
        const wallet = this.prisma.wallet.create({
            data: {
                userId: user.id,
            }
        })
        return wallet;
    }
}
