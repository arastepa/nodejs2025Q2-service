import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: { login: string; password: string }) {
    const { login, password } = body;
    if (
      !login ||
      typeof login !== 'string' ||
      !password ||
      typeof password !== 'string'
    ) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    return await this.authService.signup(login, password);
  }

  @Public()
  @Post('login')
  async login(@Body() body: { login: string; password: string }) {
    const { login, password } = body;
    if (
      !login ||
      typeof login !== 'string' ||
      !password ||
      typeof password !== 'string'
    ) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    return await this.authService.login(login, password);
  }

  @Post('refresh') // Guard applied by default
  async refresh(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new HttpException('Invalid data', HttpStatus.UNAUTHORIZED);
    }
    return await this.authService.refresh(refreshToken);
  }
}
