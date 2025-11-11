import { Controller, Post, Body, Get, Req, UseGuards, Query, Param, Headers, ParseIntPipe, NotAcceptableException, DefaultValuePipe, ValidationPipe, UsePipes, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import type {Request } from "express"
import { TransformTpUpperCasePipe } from 'src/Pipes/upper-case.pipe';
import { RegisterBodyDto } from './auth.dto';
// import { AuthGuard } from 'src/Guards/auth.guard';
import { Auth, AuthUser, Roles } from 'src/Decorators/custom.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';
import { CheckPasswordPipe } from 'src/Pipes/checkPassword.pipe';
import { LoginDto, SignupDto } from './signup.dto';
import { ZodValidationPipe } from 'src/Pipes/zod.pipe';
import { loginSchema, signupSchema } from './signup.zod';
import { AuthGuard } from '@nestjs/passport';
import { LoggerInterceptor } from 'src/Interceptors/logger.interceptor';




@Controller('auth')
@Roles(['user', 'admin'])
@UseGuards(AuthGuard, RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
@UsePipes(new ZodValidationPipe(signupSchema))
async signup(@Body() data:SignupDto){
  return await this.authService.signup(data)
}

@Post('login')
@UsePipes(new ZodValidationPipe(loginSchema))
async login(@Body() data:LoginDto){
  return await this.authService.login(data)
}

@Get('confirm')
async confirm(@Query('token') token: string) {
  return this.authService.confirmEmail(token);
}

@Post('forgot-password')
async forgot(@Body('email') email: string) {
  return this.authService.forgotPassword(email);
}

@Post('reset-password')
async reset(@Body() body: { token: string, newPassword: string }) {
  return this.authService.resetPassword(body.token, body.newPassword);
}

@Get('google')
@UseGuards(AuthGuard('google'))
async googleLogin() {
}

@Get('google/callback')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('google'))
googleCallback(@Req() req) {
  return req.user; 
}

// @UseGuards(new AuthGuard(), RolesGuard)
// @Auth(['user', 'admin'])
// @UsePipes(new ValidationPipe({whitelist:true}))
// register(
//   // @Req() req:Request,
//   @AuthUser() user:unknown,
//   @Body(CheckPasswordPipe) body:SignupDto,
//   // @Body() body: RegisterBodyDto,
//   // @Param('id') id:string,
//   // @Param() params:unknown,
//   // @Headers('') header:unknown
// ){
//   // return this.authService.register()
// }


  // login(@Body() dto: LoginDto) {
  //   return this.authService.login(dto);
  // }


}
