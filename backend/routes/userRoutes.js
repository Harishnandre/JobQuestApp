import express from 'express'
import { bookmarkAnyJobs, forgetPassword, getUserById, loginUser, logoutUser, registerNewUser, unbookmarkJob, updatePassword, updateProfile ,getRecomendedJobs} from '../controller/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import singleUpload from '../middleware/multerProvider.js';
const router=new express.Router();

router.post('/user/register',registerNewUser)
      .post('/user/login',loginUser)
      .patch('/user/forget-password',forgetPassword)
      .patch('/user/update-profile',singleUpload,updateProfile)
      .patch('/user/update-password',isAuthenticated,updatePassword)
      .post('/user/logout',isAuthenticated,logoutUser)
      .patch('/user/bookmark/:id',isAuthenticated,bookmarkAnyJobs)  //id= job id
      .patch('/user/unbookmark/:id',isAuthenticated,unbookmarkJob)  //id= job id
      .get('/user/get/:id',getUserById) //id=user id
      .patch('/user/get-recommended-jobs',isAuthenticated, getRecomendedJobs)
export default router      

