import express from 'express'
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from '../controller/companyController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import singleUpload from '../middleware/multerProvider.js';

const router=new express.Router();
router.post('/company/create',isAuthenticated,createCompany)
      .get('/company/get',isAuthenticated,getAllCompanies)
      .get('/company/get/:id',isAuthenticated,getCompanyById)
      .put('/company/update/:id',isAuthenticated,updateCompany)
      .delete('/company/delete/:id',isAuthenticated,deleteCompany)
export default router      