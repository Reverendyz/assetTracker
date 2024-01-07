import { IsDate, IsDateString, IsEmail, IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class AuthDto  {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsDateString()
    @IsNotEmpty()
    birth: string
}