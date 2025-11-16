import { diskStorage } from "multer"



export const multerOption = (destination: string)=>{
    const storage =  diskStorage({
                destination,
                filename: (req, file, cb)=>{
                    const uniqueFileName = Date.now() + "-" + file.originalname
                    cb(null, uniqueFileName)
                }
            })
            return storage
        
}