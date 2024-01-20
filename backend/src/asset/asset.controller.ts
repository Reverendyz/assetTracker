import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { AssetService } from './asset.service';
import { AssetDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('asset')
export class AssetController {
    constructor(
        private assetService: AssetService
    ){}
    @Post('add')
    addToWallet(@GetUser() user: User, @Body() asset: AssetDto){
        return this.assetService.addToWallet(user, asset);
    }
}   
