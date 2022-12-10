// import { IProductRepository } from "../../repositories/IProductRepositoryCreate";
import { IRegisterRepository } from "../repositories/IRegisterNewUser";
import { ICreateUserDTO } from "./RegisterNewUserDTO";
import { User, UserSchema} from "../entities/UserSchema";
import { hash } from 'bcryptjs';


export class CreateUserUseCase{

    constructor(
        private userRepository: IRegisterRepository
    ){}

    async execute(data: ICreateUserDTO){

        
       
        data.password = await hash(data.password, 8);

        const Users = new UserSchema(data);
        await this.userRepository.save(Users)


    }
}