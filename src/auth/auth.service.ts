import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(login: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser({ login, password: hashedPassword });
  }

  async login(login: string, password: string) {
    const user = await this.userService.getUserByLogin(login);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const payload = { userId: user.id, login: user.login };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return { accessToken, refreshToken };
  }
}
