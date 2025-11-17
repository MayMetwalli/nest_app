import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HydratedUser } from './../Types/user.type';
import { User } from 'src/Users/user.schema';

export interface AuthRequest extends Request {
  user?: HydratedUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<HydratedUser>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: AuthRequest = context.switchToHttp().getRequest();
    const authorization = req.headers['authorization'] || req.headers['Authorization'];

    if (!authorization || typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET as string,
      });
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userModel.findById(payload._id).select('-password').lean();
    if (!user) {
      throw new UnauthorizedException('Invalid token (user not found)');
    }

    req.user = user as HydratedUser;
    return true;
  }
}
