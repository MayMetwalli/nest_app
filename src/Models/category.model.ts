import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import slugify from "slugify";
import { User } from "src/Users/user.schema";
import { Brand } from "./brand.model";


@Schema({
    timestamps: true
})
export class Category{
    @Prop({
        type: String,
        required: true,
        unique: true
    })
    name: string

    @Prop({
        type: String,
        required: true,
        unique: true,
        set: function(value: string){
            this.set({slug: slugify(value)}) 
            return value
        }
    })
    slug: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User.name
    })
    createdBy: Types.ObjectId

    @Prop({
        type: String,
        required: true,

    })
    image: string

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: Brand.name
    } )

    brands: Array<Types.ObjectId>
}

const categorySchema = SchemaFactory.createForClass(Category);





export const CategoryModel = MongooseModule.forFeature([
    {
        name: Category.name,
        schema: categorySchema
    }
])