
import * as Mongo  from "../../repositories/Implementation/MongoLoginUser";
import { LoginController } from "./LoginUserController";
import { LoginUseCase } from "./LoginUseCase";

const MongoUserRepositoryLogin = new Mongo.MongoLoginUser()
//create merge
const loginUserUseCase = new LoginUseCase(
    MongoUserRepositoryLogin
)

const loginController = new LoginController(
    loginUserUseCase
)

export {loginUserUseCase, loginController}