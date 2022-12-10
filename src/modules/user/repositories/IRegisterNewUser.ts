import { User } from "../entities/UserSchema";

export interface IRegisterRepository{
    save(user:User): Promise<void>;
}