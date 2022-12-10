import { User, UserSchema } from "../../entities/UserSchema";
import { IRegisterRepository } from "../IRegisterNewUser";


export class MongoCarsRepositoryCreateUser implements IRegisterRepository{
    async save(user: User): Promise<void> {

        await UserSchema.create(user);
    }
}