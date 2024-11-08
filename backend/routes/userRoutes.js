import express from 'express'
import { bookmarkAnyJobs, forgetPassword, getUserById, loginUser, logoutUser, registerNewUser, unbookmarkJob, updatePassword, updateProfile } from '../controller/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router=new express.Router();

router.post('/user/register',registerNewUser)
      .post('/user/login',loginUser)
      .patch('/user/forget-password',forgetPassword)
      .post('/user/logout',isAuthenticated,logoutUser)
      .patch('/user/update-profile',isAuthenticated,updateProfile)
      .patch('/user/update-password',isAuthenticated,updatePassword)
      .post('/user/bookmark/:id',isAuthenticated,bookmarkAnyJobs)  //id= job id
      .patch('/user/unbookmark/:id',isAuthenticated,unbookmarkJob)  //id= job id
      .get('/user/get/:id',getUserById) //id=user id
export default router      

