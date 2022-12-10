import { NextFunction, Request, Response } from "express";
import { jwtModule, ModuleJWT } from "../../../../utils/Config/Auth";
import { verify } from "jsonwebtoken";
import { promisify } from 'util';

export class MiddlewareController {


    async handle(request: Request, response:Response, next:NextFunction): Promise<any>{
        
        try{
            
        if(!request.headers.authorization){
            throw new Error('non-existent token')
        }

        const [, onlyToken] = request.headers.authorization.split(" ")
        const { secret, expireIn } = jwtModule
        const decoded = await verify(onlyToken, secret)

        if(!decoded){
            throw new Error('expired token')
        }else{

         next()
        }



        }catch(err){
            console.log(err)
            if (err instanceof Error) {
                console.log(err)
                return response.status(403).json({
                    message: err.message
                })
              } else {
         
                return response.status(400).json({
                    message:'Unexpected error'
                })
              }
          
            
        }
    }
}