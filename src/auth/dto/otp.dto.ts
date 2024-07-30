import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';

export class OtpDto {
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  createdAt: Date;
}
