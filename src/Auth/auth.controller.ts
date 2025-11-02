import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
// import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { z } from 'zod';
import { ZodValidationPipe } from '../Pipes/zod-validation.pipe';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  // @Post('login')
  // login(@Body() dto: LoginDto) {
  //   return this.authService.login(dto);
  // }

  @Post('login')
login(@Body(new ZodValidationPipe(loginSchema)) body) {
  return this.authService.login(body);
}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
