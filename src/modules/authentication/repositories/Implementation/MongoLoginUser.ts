import { User, UserSchema } from "../../../user/entities/UserSchema";
import { ILoginUser } from "../ILoginUser";



export class MongoLoginUser implements ILoginUser{
    async findEmail(email: string): Promise<any> {

        const userExist = await UserSchema.findOne({email})
        return userExist;
    }

}