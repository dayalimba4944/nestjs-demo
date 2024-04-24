import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus, HttpException,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) { }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() payload: Record<string, any>) {
    return this.authService.register(payload.username, payload.email, payload.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }


  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    try {
      const username = req.user.username;
      // Fetch user profile data from the userService
      const userProfile = await this.userService.findProfileByUsername(username);
      return userProfile;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      throw new HttpException('User profile retrieval failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}