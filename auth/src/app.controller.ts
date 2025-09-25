import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'API is running' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() dto: RegisterDto) {
    return this.appService.register(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() dto: LoginDto) {
    return this.appService.login(dto);
  }
}
