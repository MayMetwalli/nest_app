import {Module} from '@nestjs/common'
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryModel } from 'src/Models/category.model';
import { BrandModel } from 'src/Models/brand.model';
import { UserModel } from 'src/Models/user.model';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [CategoryModel, BrandModel, UserModel],
    controllers: [CategoryController],
    providers: [CategoryService, JwtService]
})




export class CategoryModule {}