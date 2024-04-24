import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string): Promise<{ access_token: string, userData: any }> {
    const user = await this.usersService.findOne(username);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { sub: user.userId, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);
    
    return { access_token, userData: user };
  }

  async register(username: string, email: string, password: string): Promise<{ access_token: string, userData: any }> {
    const userExists = await this.usersService.findOne(username);
    if (userExists) {
        throw new UnauthorizedException('User already exists');
    }

    const newUser = await this.usersService.create(username, email, password);

    const payload = { sub: newUser.userId, username: newUser.username };
    const user = await this.usersService.findOne(username);
    const access_token = await this.jwtService.signAsync(payload);
    
    return { access_token, userData: user };
  }
}
