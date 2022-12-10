import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController {

    constructor(
        private loginUseCase: LoginUseCase,
    ){}

    async handle(request: Request, response:Response): Promise<Response>{
        const { email, password} = request.body;
        
        try{
            const user = await this.loginUseCase.execute({
                email,
                password
            })
            return response.status(200).send({user})

        }catch(err){
            console.log(err)
            if (err instanceof Error) {
         
                return response.status(400).json({
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