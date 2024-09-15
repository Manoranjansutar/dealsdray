import employeeModels from "../models/employeeModels.js";
import fs from "fs"

//function to add employee
const addEmployeeController = async(req,res)=>{

    let image_filename =    `${req.file.filename}`

    const {
        employee_name,
        employee_email,
        employee_Id,
        employee_mobile,
        employee_gender,
        employee_designation,
        employee_course,
        // employee_profile_photo
    }  = req.body;

    try {
        const isExist = await employeeModels.findOne({employee_email,employee_Id,employee_mobile})
        if(isExist){
            return  res.json({
                success:false,
                message:"Employee Already Exist"
            })
        }

        const newEmployee = new employeeModels({
            employee_name,
            employee_email,
            employee_Id,
            employee_mobile,
            employee_gender,
            employee_designation,
            employee_course,
            employee_profile_photo : image_filename
        })
        
        await newEmployee.save();

        return res.json({
            success:true,       
            message:"Employee Added Successfully"               
        })      
   
    } catch (error) {
         console.log(error)
      return res.json({
         success:false,
         message:"Something went wrong"
      })
    }
}

//function to get employee details
const getEmployeeDetailsController = async(req,res)=>{
    try {
        const employees = await employeeModels.find({});
        return res.json({
            success:true,
            data:employees
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

//function to delete employee
const deleteEmployeeController = async(req,res)=>{
    try {
        const employee = await employeeModels.findById(req.body.id)

        if (!employee) {
            return res.json({
                success: false,
                message: "Employee not found"
            });
        }

        await employeeModels.findByIdAndDelete(req.body.id)
        return res.json({
            success:true,
            message:"Employee Deleted Successfully"
        })  
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

//function to edit employee details
const editEmployeeController = async (req, res) => {
    const { id } = req.params; 
    const {
        employee_name,
        employee_email,
        employee_Id,
        employee_mobile,
        employee_gender,
        employee_designation,
        employee_course,
        // employee_profile_photo
    } = req.body;

    let image_filename;
    if (req.file) {
        image_filename = `${req.file.filename}`;
    }

    try {
        const employee = await employeeModels.findById(id);
        if (!employee) {
            return res.json({
                success: false,
                message: "Employee Not Found"
            });
        }

        employee.employee_name = employee_name || employee.employee_name;
        employee.employee_email = employee_email || employee.employee_email;
        employee.employee_Id = employee_Id || employee.employee_Id;
        employee.employee_mobile = employee_mobile || employee.employee_mobile;
        employee.employee_gender = employee_gender || employee.employee_gender;
        employee.employee_designation = employee_designation || employee.employee_designation;
        employee.employee_course = employee_course || employee.employee_course;
        if (image_filename) {
            employee.employee_profile_photo = image_filename;
        }

        await employee.save();

        return res.json({
            success: true,
            message: "Employee Updated Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong"
        });
    }
};

//function to get total male and female
const getTotalMaleFemaleController = async (req, res) => {  
    try {
        const totalMale = await employeeModels.find({ employee_gender: "Male" }).countDocuments();
        const totalFemale = await employeeModels.find({ employee_gender: "Female" }).countDocuments();
        return res.json({
            success: true,
            totalMale,
            totalFemale
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong"
        });
    }
}

//function to get total designation
const getTotalDesignationController = async (req, res) => {
    try {
        const totalHR = await employeeModels.find({employee_designation:"HR"}).countDocuments();
        const TotalManager = await employeeModels.find({employee_designation:"Manager"}).countDocuments();
        const TotalSales = await employeeModels.find({employee_designation:"Sales"}).countDocuments();
        return res.json({
            success: true,
            totalHR,
            TotalManager,
            TotalSales
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//function to get total course
const getTotalCourseController = async (req, res) => {
    try {
        const totalBSC = await employeeModels.find({employee_course:"BSC"}).countDocuments();
        const totalBCA = await employeeModels.find({employee_course:"BCA"}).countDocuments();
        const totalMCA = await employeeModels.find({employee_course:"MCA"}).countDocuments();
        return res.json({
            success: true,
            totalBSC,
            totalBCA,
            totalMCA
        })
    } catch (error) {
        console.log(error) 
        return res.json({
            success: false,
            message: "Something went wrong"
        }) }
   }

   //function to search employee
   const searchQueryController = async (req, res) => {
    try {
        const query = req.query.q ? req.query.q.trim() : '';
    
        if (query === '') {
          return res.json([]);
        }
    
        const searchResults = await employeeModels.find({
          $or: [
            { employee_Id: { $regex: new RegExp(query, 'i') } },  
            { employee_name: { $regex: new RegExp(query, 'i') } },
            { employee_course: { $regex: new RegExp(query, 'i') } },
            { employee_designation: { $regex: new RegExp(query, 'i') } },
            { employee_gender: { $regex: new RegExp(query, 'i') } },
            { employee_mobile: { $regex: new RegExp(query, 'i') } },
            { employee_email: { $regex: new RegExp(query, 'i') } },
          ]
        });
    
        res.json(searchResults);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
    
};

export {addEmployeeController ,getEmployeeDetailsController , deleteEmployeeController , editEmployeeController ,getTotalMaleFemaleController , getTotalDesignationController , getTotalCourseController , searchQueryController}