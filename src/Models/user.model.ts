import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';
import mongoose from 'mongoose';
import { SignupDto } from 'src/Auth/signup.dto';
import { IUser, RolesEnum } from 'src/Types/user.type';

@Schema({
  timestamps: true,
})
export class User implements IUser{
  @Prop({
    get: function(this: SignupDto){
      return `${this.firstName} ${this.lastName}`
    },
    set: function(value){
      const firstName = value.split(' ')[0]
      const lastName = value.split(' ')[0]

      this.set({firstName, lastName})
    }
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: String,
    required: true,
    set: function(value: string){
      const hashedPassword = hashSync(value, +(process.env.SALT as string))
      return hashedPassword

    }
  })
  password: string
}

const userSchema = SchemaFactory.createForClass(User);

export const UserModel = MongooseModule.forFeature([
  {
    name: User.name,
    schema: userSchema,
  },
]);
