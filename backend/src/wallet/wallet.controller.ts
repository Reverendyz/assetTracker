import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
<<<<<<< HEAD
=======
import { PrismaService } from 'src/prisma/prisma.service';
>>>>>>> 0d49012 (feature(wallet): function add)
import { WalletService } from './wallet.service';

@UseGuards(JwtGuard)
@Controller('wallet')
export class WalletController {
    constructor(
        private walletService: WalletService
    ){}

    @Get('my-wallet')
    getMyWallet(@GetUser() user: User){
        return this.walletService.getMyWallet(user);
    }

    @Post('create')
    createWallet(@GetUser() user: User){
        return this.walletService.createWallet(user);
    }
}
