import { Injectable, CanActivate, ExecutionContext, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HydratedUser } from "../Types/user.type";
import { UserModel } from "../Models/user.model";
import { User } from "src/Users/user.schema";

export interface AuthRequest extends Request {
  user: HydratedUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<HydratedUser>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: AuthRequest = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new BadRequestException("Invalid token");
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new BadRequestException("Invalid token");
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET as string,
      });
    } catch (err) {
      throw new BadRequestException("Invalid or expired token");
    }

    const user = await this.userModel.findById(payload._id).select("-password");

    if (!user) {
      throw new BadRequestException("Invalid token");
    }

    req.user = user;
    return true;
  }
}
