import * as Mongo  from "../repositories/implementation/MongoRegisterNewUser";
import { CreateUserController } from "./RegisterNewUserController";
import { CreateUserUseCase } from "./RegisterNewUserUseCase";

const MongoUserRepository = new Mongo.MongoCarsRepositoryCreateUser()
//create merge
const userUseCase = new CreateUserUseCase(
    MongoUserRepository
)

const createUserController = new CreateUserController(
    userUseCase
)

export {userUseCase, createUserController}