import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.appService.register(dto);
  }


  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.appService.login(dto);
  }
}
