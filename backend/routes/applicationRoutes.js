import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { applyForJob, getAllApplicationForJob, getAllUserApplication, updateStatus } from '../controller/applicationController.js';

const router=new express.Router();
router.post('/application/apply/:id',isAuthenticated,applyForJob)      //id=Job id
      .get('/application/get/:id',getAllUserApplication)
      .get('/application/get/job/:id',getAllApplicationForJob)  //id=Job id
      .patch('/application/status/:id',isAuthenticated,updateStatus)    // id=application id

      
export default router   