import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtPayload } from './jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
    return this.authService.signIn(authCredentialsDto);
  }

  // @Get()
  // @Render('index')
  
  @Get('/adminHome')
  @Render('adminHome')
  async adminHome(){
    return await this.authService.adminHome();
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
