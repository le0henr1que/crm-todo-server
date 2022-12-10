export interface ModuleJWT extends Document {
    secret: string;
    expireIn: string;
}

const jwtModule = <ModuleJWT>{
    secret:"c963ca56d7ee4d9ef16e856f2d47cb148acc9618d6c401eccb391bdea0dd8dd2", 
    expireIn: "6h"
}

export  { jwtModule } 