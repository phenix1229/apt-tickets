import { Controller, Get, Post, Patch, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    public getUsers() {
        return 'you sent get request to users endpoint';
    }
    
    @Get('/:id')
    public getUser(@Param() params: any) {
        return 'you sent get request to users endpoint';
    }

    @Post()
    public createUsers(@Body() request: any) {
        console.log(request)
        return request;
    }
}
