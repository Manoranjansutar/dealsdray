import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const EditModal = ({employee , closeModal , onEditSuccess}) => {

  const [image , setImage] = useState(null) //set to upload image
  const [formData, setFormData] = useState({});//set to edit form data of employee to 

useEffect(() => {
  if (employee) {
      setFormData({
          employee_name: employee.employee_name,
          employee_email: employee.employee_email,
          employee_Id: employee.employee_Id,
          employee_mobile: employee.employee_mobile,
          employee_gender: employee.employee_gender,
          employee_designation: employee.employee_designation,
          employee_course: employee.employee_course,
          employee_profile_photo: `http://localhost:5000/images/${employee.employee_profile_photo}`,
      });
      setImage(`http://localhost:5000/images/${employee.employee_profile_photo}`);
  }
}, [employee]);

//handle form data change and set it to form data
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

//handle form submit edit form data
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    axios.put("http://localhost:5000/api/employee/edit_employee/" + employee._id, formData)
    .then((response) => {
      if (response.data && response.data.success) {
        console.log("Success:", response.data.success);
        console.log("success")
        onEditSuccess();
        closeModal();
        toast.success("Employee Updated Successfully")
      } else {
        toast.error("Something went wrong")
      }
    })
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="flex transform -translate-x-1/2 -translate-y-1/2 absolute md:top-1/2 md:left-1/2 md:w-[450px] md:h-[700px] z-50  text-black px-4 font-semibold overflow-x-hidden overflow-y-auto inset-0 bg-white outline-none focus:outline-none flex-col justify-center items-center rounded-lg">
    <Toaster/>
      <ImCross
        className="absolute z-50 text-xl text-black top-4 right-3"
        onClick={closeModal}
      />
      <h1 className="text-2xl border-b border-black">Edit New Employee</h1>
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
            value={formData.employee_Id}
            onChange={handleChange}
            className="flex-1 px-4 py-1 border-b border-black outline-none w-60"
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
            value={formData.employee_name}
            onChange={handleChange}
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
            value={formData.employee_email}
            onChange={handleChange}
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
            value={formData.employee_mobile}
            onChange={handleChange}
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
            value={formData.employee_gender}
            onChange={handleChange}
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
            value={formData.employee_course}
            onChange={handleChange}
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
            value={formData.employee_designation}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
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
              src={image ? (typeof image === 'string' ? image : URL.createObjectURL(image)) : 'default-image-url'}
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
          Save Changes
        </button>
      </form>
    </div>
  </div>
  )
}

export default EditModal
