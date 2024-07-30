import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { Otp } from './entities/otp.entity';
import * as otpGenerator from "otp-generator"
import { OtpDto } from './dto/otp.dto';
import { Refresh } from './entities/refresh-token.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()  
export class AuthService {
  constructor(
    @InjectModel("Auth") private readonly authModel: Model<Auth>,
    @InjectModel("Otp") private readonly otpModel: Model<Otp>,
    @InjectModel("Refresh") private readonly refreshModel: Model<Refresh>,

    private jwtService: JwtService,
    private readonly mailer: MailerService
  ) { }

  async generateOtp(length: number = 6): Promise<number> {
    return otpGenerator.generate(length, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
  }

  async signUp(signUpDto: SignUpDto) {
    const { userName, email, password } = signUpDto
    const hashedPassword = await bcrypt.hash(password, 13)
    const newUser = await this.authModel.create({
      ...signUpDto,
      password: hashedPassword
    })
    
    const otp = await this.generateOtp(5)

    await this.otpModel.create({ otp, userId: newUser.id })

    await this.mailer.sendMail({
      to: email,
      subject: "Verification code!",
      html: `Here is your ${otp} code.`, 
    })

    return {
      message: "User created.",
      userId: newUser.id,
      otpSent: true 
    }
  }

  async verifyOtp(otpDto: OtpDto) {
    const userOtp = await this.otpModel.findOne({ userId: otpDto.userId }).exec()
    if(!userOtp) {
      throw new UnauthorizedException('User with current id is not verified!')
    } 
    if(userOtp.otp !== otpDto.otp) {
      throw new BadRequestException('Ivalid OTP!')
    }

    await this.authModel.updateOne(
      { _id: userOtp.userId },
      { $set: { isVerified: true } }
    ).exec()

    await userOtp.deleteOne()

    return { message: "Otp verified, account activated" }
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.authModel.findOne({ email: signInDto.email })

    if(user.isVerified !== true) {
      throw new UnauthorizedException("User is not verified")
    } 

    if(!user) {
      throw new NotFoundException("Invalid email or password.")
    }

    const passwordCompare = await bcrypt.compare(signInDto.password, user.password)
    if(!passwordCompare) {
      throw new UnauthorizedException("Invalid email or password.")
    }

    const payload = { email: user.email, sub: user.id }
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    })

    await this.refreshModel.deleteOne({ userId: user.id})

    await this.refreshModel.create({
      userId: user.id,
      refreshToken: refreshToken,
      expiresAt: new Date(Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 1000)
    })

    return { accessToken, refreshToken }
  }
}