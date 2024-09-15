import mongoose from "mongoose";
import fs from "fs"

const employeeSchema = new mongoose.Schema({
    employee_name: {
        type: String,
        required: true
    },
    employee_email: {
        type: String,
        required: true,
        unique: true
    },
    employee_Id: {
        type: String,
        required: true,
        unique: true
    },
    employee_mobile: {
        type: String,
        required: true
    },
    employee_gender: {
        type: String,
        required: true
    },
    employee_designation: {
        type: String,
        required: true
    },
    employee_course: {
        type: String,
        required: true
    },
    employee_profile_photo: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'joinedAt',
        updatedAt: 'updatedAt'
    }
});


const employeeModels = mongoose.model("employees",employeeSchema) || mongoose.model("employees")

export default employeeModels