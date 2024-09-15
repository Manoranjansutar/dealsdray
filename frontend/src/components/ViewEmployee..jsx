import React from 'react'
import { ImCross } from 'react-icons/im'

const ViewEmployee = ({employee , closeViewModal}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex transform -translate-x-1/2 -translate-y-1/2 absolute md:top-1/2 md:left-1/2 md:w-[450px] md:h-[500px] z-50  text-black px-4 font-semibold overflow-x-hidden overflow-y-auto inset-0 bg-white outline-none focus:outline-none flex-col justify-center items-center rounded-lg">
      <ImCross
          className="absolute z-50 text-xl text-black top-4 right-3"
          onClick={() => closeViewModal(false)}
        />
        <h1 className="text-2xl border-b border-black">Employee Details</h1>
        <div className="flex gap-4 mt-10">
          <img src={`http://localhost:5000/images/${employee.employee_profile_photo}`} alt=""className='w-40'/>  
          <div>
            <h1 className='text-3xl'>{employee.employee_name}</h1>
            <p><span className='text-gray-400'>Emp Id:</span> {employee.employee_Id}</p>
            <p><span className='text-gray-400'>Email:</span> {employee.employee_email}</p>  
            <p><span className='text-gray-400'>Mobile:</span> {employee.employee_mobile}</p>
            <p><span className='text-gray-400'>Gender:</span> {employee.employee_gender}</p>
            <p><span className='text-gray-400'>Designation:</span> {employee.employee_designation}</p>
            <p><span className='text-gray-400'>Course:</span> {employee.employee_course}</p> 
          </div>
        </div>
      </div>
      </div>
  )
}

export default ViewEmployee
