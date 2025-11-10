import { IsEmail, IsNotEmpty, IsString, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({name: 'confirmationPasswordMatch', async: false})
class confirmationPasswordMatch implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments){
        if (value !== args.object['password']) return false
        // console.log({value, args})
        return true
    }
    defaultMessage(): string{
        return 'Passwords dont match ';
    }
}

export class RegisterBodyDto{
    @IsString({message:'name must be a string'})
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:string;

    @Validate(confirmationPasswordMatch)
    cPassword: string
}