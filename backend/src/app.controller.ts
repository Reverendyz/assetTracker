import { Controller, Get, HttpCode, HttpStatus, Response } from "@nestjs/common";

@Controller('')
export class AppController{
    @Get('')
    @HttpCode(HttpStatus.OK)
    defaultGet(){
        return {
            "message": "ok"
        }
    }
}