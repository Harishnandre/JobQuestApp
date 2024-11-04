import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { createJob, getAllJobs, getAllRecruiterJobs, getJobById } from '../controller/jobController.js';

const router=new express.Router();
router.post('/job/create',isAuthenticated,createJob)
      .get('/job/get',isAuthenticated,getAllJobs)
      .get('/job/get/:id',isAuthenticated,getJobById)
      .get('/job/get-recruiter',isAuthenticated,getAllRecruiterJobs)

      
export default router   