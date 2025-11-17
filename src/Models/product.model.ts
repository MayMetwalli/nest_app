import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import slugify from "slugify";
import { User } from "src/Users/user.schema";
import { Category } from "./category.model";
import { Brand } from "./brand.model";


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
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
        ref: 'User'
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
        ref: 'Category'
    } )
    category: Types.ObjectId


    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Brand'
    } )
    brand: Types.ObjectId


@Prop({
    type: [
      {
        name: String, 
        sku: String,
        additionalPrice: Number,
        stock: { type: Number, default: 0 },
        image: String
      }
    ],
    default: []
  })
  variants: Array<{
    name?: string;
    sku?: string;
    additionalPrice?: number;
    stock?: number;
    image?: string;
  }>;
}


const productSchema = SchemaFactory.createForClass(Product);


productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  if (!this.salePrice || this.isModified('originalPrice') || this.isModified('discount')) {
    this.salePrice = this.originalPrice - (this.discount / 100) * this.originalPrice;
  }
  next();
});




export const ProductModel = MongooseModule.forFeature([
    {
        name: Product.name,
        schema: productSchema
    }
])

export { productSchema }