import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import slugify from "slugify";
import { User } from "src/Users/user.schema";
import { Category } from "./category.model";
import { Brand } from "./brand.model";


@Schema({
    timestamps: true
})
export class Product{
    @Prop({
        type: String,
        required: true,
        unique: true,
        set: function (value: string){
            this.set({slug: slugify(value)})
            return value
        }
    })
    name: string

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    slug: string

        @Prop({
        type: String,
        required: true,

    })
    description: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User.name
    })
    createdBy: Types.ObjectId

    @Prop({
        type: [String],
        required: true,

    })
    image: string[]

        @Prop({
        type: Number,
        required: true,

    })
    originalPrice: number

            @Prop({
        type: Number,
        required: true,
        default: 0

    })
    discount: number

            @Prop({
        type: Number,
        required: true,

    })
    salePrice: number

         @Prop({
        type: Number,
        required: true,
        default: 0

    })
    stock: number

        @Prop({
        type: Number,
        required: true,
        default: 0

    })
    soldItems: number


    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: Category.name
    } )
    category: Types.ObjectId


    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: Brand.name
    } )
    brand: Types.ObjectId

}

const brandSchema = SchemaFactory.createForClass(Brand);


brandSchema.pre('save', function (next){
    this.slug = slugify(this.name, {
        lower: true,
    })
    next()
})

const productSchema = SchemaFactory.createForClass(Product);



export const ProductModel = MongooseModule.forFeature([
    {
        name: Product.name,
        schema: productSchema
    }
])