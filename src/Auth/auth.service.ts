import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Users/user.schema';
import { LoginDto, SignupDto } from './signup.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,       
    private readonly mailerService: MailerService
  ) {}

  async signup(data: SignupDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userModel.create({ ...data, password: hashedPassword, isActive: false });

    const token = this.jwtService.sign({ email: user.email }, { expiresIn: '1d' });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Confirm your email',
      html: `<a href="http://localhost:3000/auth/confirm?token=${token}">Click here to confirm your email</a>`,
    });

    return { message: 'Confirmation email sent' };
  }

  async confirmEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userModel.findOne({ email: payload.email });
      if (!user) throw new BadRequestException('Invalid token');
      user.isActive = true;
      await user.save();
      return { message: 'Email confirmed' };
    } catch (err) {
      throw new BadRequestException('Token expired or invalid');
    }
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.userModel.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({ _id: user._id }, {
      secret: process.env.TOKEN_SECRET as string
    });

    return { accessToken };
  }

  async forgotPassword(email: string) {
  const user = await this.userModel.findOne({ email });
  if (!user) throw new BadRequestException('Email not found');

  const token = this.jwtService.sign({ email: user.email }, { expiresIn: '15m' });

  await this.mailerService.sendMail({
    to: email,
    subject: 'Reset your password',
    html: `<a href="http://localhost:3000/auth/reset-password?token=${token}">Reset Password</a>`
  });

  return { message: 'Password reset email sent' };
}

async resetPassword(token: string, newPassword: string) {
  try {
    const payload = this.jwtService.verify(token);
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user) throw new BadRequestException('Invalid token');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return { message: 'Password reset successfully' };
  } catch (err) {
    throw new BadRequestException('Token expired or invalid');
  }
}


async validateGoogleUser(profile: any) {
  const { emails, displayName } = profile;
  let user = await this.userModel.findOne({ email: emails[0].value });

  if (!user) {
    user = await this.userModel.create({
      email: emails[0].value,
      name: displayName,
      isActive: true,
      password: null
    });
  }

  const jwt = this.jwtService.sign({ _id: user._id });
  return { accessToken: jwt };
}

}
