import { IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";

export class AssetDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    symbol: string

    @IsNumber()
    @IsNotEmpty()
    value: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number
}