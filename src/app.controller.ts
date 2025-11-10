import { Controller, Get, HttpCode, HttpStatus, Post, Query, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
    constructor (private readonly appService: AppService){}

    @Get()
    @Redirect('http://docs.nestjs.com/controllers#request-object', 301)
    getHello():string{
        return this.appService.getHello()

    }

    @Post('test/:id')
    // @HttpCode(HttpStatus.NO_CONTENT)
    test(): string{
        return this.appService.getTest(0)
    }

    @Get('docs')
    // @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version){
        if(version && version === '5'){
            return {url: 'https://docs.nestjs.com/v5/'}
        }
    }
}