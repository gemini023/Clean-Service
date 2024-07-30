import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { OtpDto } from './dto/otp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post("signUp")
  async signUP(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("verify-otp")
  async verifyOtp(@Body() otpDto: OtpDto) {
    return this.authService.verifyOtp(otpDto)
  }

  @Post("signIn")
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

}
