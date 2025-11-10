import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class TransformTpUpperCasePipe implements PipeTransform{
    transform(value:string, metadata:ArgumentMetadata){
        console.log({value, metadata})
        return value.toUpperCase()
    }
}

