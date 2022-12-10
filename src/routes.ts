import { Router } from 'express';
// import http from 'http';
import { createUserController } from './modules/user/useCase/Index';
import { loginController } from './modules/authentication/useCase/LoginUser/Index';

const router = Router()



    router.post('/user', (request, response) => {
        return createUserController.handle(request, response);
    })
   
    router.post('/login', (request, response) => {
        return loginController.handle(request, response);
    })

    
export {router}

