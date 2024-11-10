import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { createJob, getAllJobs, getAllRecruiterJobs, getJobById, updateJob } from '../controller/jobController.js';

const router=new express.Router();
router.post('/job/create',isAuthenticated,createJob)
      .get('/job/get',getAllJobs)
      .get('/job/get/:id',getJobById)
      .get('/job/get-recruiter',isAuthenticated,getAllRecruiterJobs)
      .patch('/job/update/:id',isAuthenticated,updateJob); 
      
export default router   