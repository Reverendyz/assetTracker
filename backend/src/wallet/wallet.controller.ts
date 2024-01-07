import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtGuard)
@Controller('wallet')
export class WalletController {
    constructor(private prisma: PrismaService){}

    @Get('my-wallet')
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

    @Post('create')
    createWallet(@GetUser() user: User){
        const wallet = this.prisma.wallet.create({
            data: {
                userId: user.id,
            }
        })
        return wallet;
    }
}
