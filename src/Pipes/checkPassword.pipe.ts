import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class CheckPasswordPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata){
        console.log({value, metadata})

        if(value.password != value.repeatPassword){
            throw new BadRequestException('Password must equal repeated password')
        }
        return value
    }

}