import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Users/user.schema';
import { UsersService } from 'src/Users/user.service'; 
import { LoginDto, SignupDto } from './signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  signup(data: SignupDto) {
    throw new Error('Method not implemented.');
  }

  constructor(@InjectModel(User.name) private userModel:Model<User>,
  private JwtService: JwtService){}


  async login(data: LoginDto){
    const {email, password} = data
    const user = await this.userModel.findOne({email})
    if(!user || !await bcrypt.compare(password, user.password)){
      throw new BadRequestException('invalid credentials')
    }
    const accessToken = await this.JwtService.sign({
      _id: user._id
    },{
      secret: process.env.TOKEN_SECRET as string
    })
    return{
      accessToken
    }
  }
}
