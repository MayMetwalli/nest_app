import { Module } from "@nestjs/common";
import { BrandController } from "./brand.controller";
import { BrandModel } from "src/Models/brand.model";
import { BrandService } from "./brand.service";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "src/Models/user.model";


@Module({
    imports:[
        BrandModel,
        UserModel
    ],
    controllers: [BrandController],
    providers: [BrandService, JwtService]
})
export class BrandModule {}