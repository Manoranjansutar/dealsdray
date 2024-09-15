import express from 'express'
import { addEmployeeController, deleteEmployeeController, editEmployeeController, getEmployeeDetailsController, getTotalCourseController, getTotalDesignationController, getTotalMaleFemaleController, searchQueryController } from '../controllers/employeeControllers.js';



import multer from 'multer'

const employeeRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) =>{
        cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

employeeRouter.post('/add_employee',upload.single('employee_profile_photo'),addEmployeeController)
employeeRouter.get('/get_employee', getEmployeeDetailsController)
employeeRouter.post('/delete_employee', deleteEmployeeController)
employeeRouter.put('/edit_employee/:id', editEmployeeController)
employeeRouter.get('/totalmalefemale', getTotalMaleFemaleController)
employeeRouter.get('/totaldesignation', getTotalDesignationController)
employeeRouter.get('/totalcourse', getTotalCourseController)
employeeRouter.get('/search', searchQueryController)

export default employeeRouter;