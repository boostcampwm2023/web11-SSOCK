import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dtoTest';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  @ApiResponse({
    description: '회원가입 API'
  })
  @ApiBody({ type: CreateUserDTO })
  getUser(@Body() userData: CreateUserDTO): CreateUserDTO {
    return this.appService.register(userData);
  }
}
