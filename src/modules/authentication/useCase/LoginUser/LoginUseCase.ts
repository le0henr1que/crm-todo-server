// import { IProductRepository } from "../../repositories/IProductRepositoryCreate";
import { ILoginUser } from "../../repositories/ILoginUser";
import { ICreateUserDTO } from "./LoginDTO";
import { User, UserSchema} from "../../../user/entities/UserSchema";
import { compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken';

import {jwtModule} from '../../../../utils/Config/Auth'


export class LoginUseCase{

    constructor(
        private loginRepository: ILoginUser
    ){}

    async execute(data: ICreateUserDTO){

        
        const searchUser = await this.loginRepository.findEmail(data.email)
        if(!searchUser){
            throw new Error('User not exist')
        }
        if(!(await compare(data.password, searchUser.password))){
            throw new Error('Invalid password')
        }

        const user = {
            name: searchUser.name,
            email: searchUser.email,
            token:{
                token:sign({id:searchUser._id}, jwtModule.secret, {expiresIn:jwtModule.expireIn})
            }
        }
        return user
        


    }
}