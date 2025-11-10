import z from "zod"


export const signupSchema = z.strictObject({
    email: z.email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
    username: z.string().min(3).max(10)
}).superRefine((args, ctx)=>{
    if(args.password != args.repeatPassword){
        ctx.addIssue({code: 'custom', message: 'password must match repeated password'})
    }
})


export const loginSchema = z.object({
    password:z.string(),
    email: z.email(),
})