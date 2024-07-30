import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    private transporter;

    async sendEmail(email: string, otp: string): Promise<void> {
        await this.transporter.sendMail({
            to: email,
            from: process.env.EMAIL_USER,  
            subject: "Verification code!",
            html: `Here is your ${otp} code.`,
        });
    }
}