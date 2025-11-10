import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";
import z from "zod";
import { loginSchema, signupSchema } from "./signup.zod";

// export class SignupDto{
//     @IsString()
//     @Length(3,10)
//     username: string;

//     @IsString()
//     @IsEmail()
//     email: string;

//     @IsString()
//     @IsStrongPassword()
//     password: string;

//     @IsString()
//     repeatPassword: string;
// }

export type SignupDto = z.infer<typeof signupSchema> & {firstName: string, lastName: string}
export type LoginDto = z.infer<typeof loginSchema> & {firstName: string, lastName: string}
