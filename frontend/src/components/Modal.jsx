import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import upload from "./../assets/upload_area.png";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


const Modal = ({ openModal, setOpenModal , refreshData }) => {
  const [image, setImage] = useState(null);//for image upload
  const [data, setData] = useState({ //for form data to add employee
    employee_name: "",
    employee_email: "",
    employee_Id: "",
    employee_mobile: "",
    employee_gender: "",
    employee_designation: "",
    employee_course: "",
    employee_profile_photo: "",
  });

  //for image upload
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };    

  //for form data to add employee
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("employee_name", data.employee_name);
    formData.append("employee_email", data.employee_email);
    formData.append("employee_Id", data.employee_Id);
    formData.append("employee_mobile", data.employee_mobile);
    formData.append("employee_gender", data.employee_gender);
    formData.append("employee_designation", data.employee_designation);
    formData.append("employee_course", data.employee_course);
    formData.append("employee_profile_photo", image);

    

   try {
     axios.post("http://localhost:5000/api/employee/add_employee", formData)
     .then((response)=>{
        if (response.data && response.data.success) {
            console.log("Success:", response.data.success);
            console.log("success")
            refreshData()
            setData({
                employee_name: "",
                employee_email: "",
                employee_Id: "",
                employee_mobile: "",
                employee_gender: "",
                employee_designation: "",
                employee_course: "",
            })
            setImage(false)
            toast.success("Employee Added Successfully!!!")
            setOpenModal(false)
        }
        else{
            console.log("something went wrong")
            toast.error("Employee not added!!!")
        }
     })
  
   } catch (error) {
        console.log(error)
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);
        console.log("something went wrong2")
   }
  }
  
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* <div className="flex transform -translate-x-1/2 -translate-y-1/2 absolute md:top-1/2 md:left-1/2 md:w-[450px] md:h-[700px] z-50  text-black px-4 font-semibold overflow-x-hidden overflow-y-auto inset-0 bg-white outline-none focus:outline-none flex-col justify-center items-center rounded-lg w-[400px] top-0 left-0"> */}
      <div className="flex transform -translate-x-1/2 -translate-y-1/2 absolute md:top-1/2 md:left-1/2 md:w-[450px] md:h-[700px] z-50   px-4 font-semibold overflow-x-hidden overflow-y-auto inset-0 bg-white outline-none focus:outline-none flex-col justify-center items-center rounded-lg top-1/2 left-1/2 w-[380px] h-full">
      <Toaster/>
        <ImCross
          className="absolute z-50 text-xl text-black top-4 right-3"
          onClick={() => setOpenModal(false)}
        />
        <h1 className="text-2xl border-b border-black">Add New Employee</h1>
        <form className="flex flex-col gap-4 mt-10"onSubmit={handleSubmit}>
          <div className="flex items-center gap-4">
            <label
              htmlFor="employee_id"
              className="w-32 text-black align-baseline"
            >
              Employee Id
            </label>
            <input
              id="employee_id"
              type="text"
              placeholder="Enter Employee Id "
              name="employee_Id"
              value={data.employee_Id}
              onChange={handleInputChange}
              className="flex-1 w-48 px-4 py-1 border-b border-black outline-none md:w-60"
            />
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="employee_name"
              className="w-32 text-black align-baseline"
            >
              Employee Name
            </label>
            <input
              id="employee_name"
              type="text"
              placeholder="Enter Employee Name"
              name="employee_name"
              value={data.employee_name}
              onChange={handleInputChange}
              className="flex-1 px-4 py-1 border-b border-black outline-none w-60"
            />
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="employee_email"
              className="w-32 text-black align-baseline"
            >
              Email
            </label>
            <input
              id="employee_email"
              type="text"
              placeholder="Enter Email"
              name="employee_email"
              value={data.employee_email}
              onChange={handleInputChange}
              className="flex-1 px-4 py-1 border-b border-black outline-none w-60"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="mobile" className="w-32 text-black align-baseline">
              Mobile
            </label>
            <input
              id="mobile"
              type="number"
              placeholder="Enter Mobile no"
              name="employee_mobile"
              value={data.employee_mobile}
              onChange={handleInputChange}
              className="flex-1 px-4 py-1 border-b border-black outline-none w-60"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="gender" className="w-32 text-black align-baseline">
              Gender
            </label>
            <select
              id="gender"
              className="flex-1 px-4 py-1 border-b border-black outline-none w-60"
              name="employee_gender"
              value={data.employee_gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="course" className="w-32 text-black align-baseline">
              Course
            </label>
            <select
              id="course"
              className="flex-1 px-4 py-1 border-b border-black outline-none w-60"
              name="employee_course"
              value={data.employee_course}
              onChange={handleInputChange}
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BSC">BSC</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="designation"
              className="w-32 text-black align-baseline"
            >
              Designation
            </label>
            <select
              id="designation"
              className="flex-1 px-4 py-1 border-b border-black outline-none w-60"
              name="employee_designation"
              value={data.employee_designation}
              onChange={handleInputChange}
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="image" className="w-32 text-black">
              Profile Photo
            </label>
            <label htmlFor="image" className="w-32 text-white ">
              <img
                src={image ? URL.createObjectURL(image) : upload}
                alt=""
                className=""
                width={150}
              />
            </label>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button
            className="px-4 py-2 mt-4 text-white bg-black rounded hover:scale-105 opacity-80"
            type="submit"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
