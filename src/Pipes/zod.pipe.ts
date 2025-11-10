import { ZodSchema } from 'zod';
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";


export class ZodValidationPipe implements PipeTransform{
    constructor (private schema: ZodSchema) {}
    
    transform(value: any, metadata: ArgumentMetadata) {
        const result = this.schema.safeParse(value)
        if(!result.success){
            throw new BadRequestException('Validation failed', {
                cause:{
                    errors: result.error
                }
            })
        }
        return value

        }
    
}