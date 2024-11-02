import express from 'express'
import { forgetPassword, loginUser, logoutUser, registerNewUser } from '../controller/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router=new express.Router();

router.post('/user/register',registerNewUser)
      .post('/user/login',loginUser)
      .patch('/user/forget-password',forgetPassword)
      .post('/user/logout',isAuthenticated,logoutUser)
export default router      

