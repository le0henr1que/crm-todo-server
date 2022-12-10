import { User } from "../../user/entities/UserSchema";

export interface ILoginUser{
    findEmail(email:string): Promise<any>;
}