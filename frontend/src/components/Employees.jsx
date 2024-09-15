import background from "./../assets/background-1.png";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Modal from "./Modal";
import EditModal from "./EditModal";
import ViewEmployee from "./ViewEmployee.";
import Lottie from "lottie-react";
import loader from "./../assets/loader2.json";
import { IoMdSearch } from "react-icons/io";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import "./../Pagination.css";

const Employees = () => {
  const [openModal, setOpenModal] = useState(false); //open add employee modal

  const [loading, setLoading] = useState(true); //for loader
  const [employee, setEmployee] = useState([]); //stores all employee data

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 9;
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(employee.length / PER_PAGE);

  //toggle add employee modal
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const [searchQuery, setSearchQuery] = useState(""); //for search query
  const [isModalOpen, setIsModalOpen] = useState(false); //open edit model
  const [selectedEmployee, setSelectedEmployee] = useState(null); //set selected employee for edit

  const [viewModal, setViewModal] = useState(false); //toggle view employee model

  //function for view modal
  const handleViewModal = (employee) => {
    setSelectedEmployee(employee);
    setViewModal(true);
  };

  //function for close view modal
  const closeViewModal = () => {
    setViewModal(false);
    setSelectedEmployee(null);
  };

  //function for edit modal
  const handleEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  //function for close edit modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  //function for get employee data from search query
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getEmployees();
  };

  //function for get all employee data
  const getEmployees = async () => {
    const endpoint = searchQuery
      ? `http://localhost:5000/api/employee/search?q=${encodeURIComponent(
          searchQuery
        )}`
      : "http://localhost:5000/api/employee/get_employee";
    try {
      await axios.get(endpoint).then((response) => {
        setEmployee(response.data.data || response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // refresh employee list
  useEffect(() => {
    getEmployees();
  }, [searchQuery]);

  //for search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //function for edit success and refresh employee list
  const onhandleEditSuccess = () => {
    getEmployees();
    closeViewModal();
  };

  //function for delete employee
  const handleDelete = async (emp) => {
    console.log(emp);
    console.log(emp.employee_Id);
    console.log(emp._id);
    try {
      await axios
        .post(`http://localhost:5000/api/employee/delete_employee`, {
          id: emp._id,
        })
        .then((response) => {
          console.log(response);
          getEmployees();
          toast.success("Employee Deleted Successfully");
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="px-[5vw] overflow-x-visible"
      style={{
        width: "99vw",
        height: "90vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-between gap-5 pt-28 md:flex-col lg:flex-row">
        <p className="text-4xl ">Employees List</p>

        <div className="relative">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="z-10 h-8 pl-8 pr-8 border-none rounded-md outline-none w-96"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="absolute text-black transform -translate-y-1/2 right-3 top-1/2"
            >
              <IoMdSearch className="text-black" />
            </button>
          </form>
        </div>

        <button
          className="px-4 py-2 font-semibold text-white bg-black rounded-md hover:opacity-75"
          onClick={handleModal}
        >
          Add Employee
        </button>
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            refreshData={getEmployees}
          />
        )}
      </div>

      {loading ? (
        <div className="w-lvw h-[90vh] flex justify-center items-center overflow-hidden">
          {" "}
          <Lottie animationData={loader} loop={true} />
        </div>
      ) : (
        <div className="min-w-full mt-10">
          <table className="w-full mt-10 text-center divide-y table-auto">
            <thead>
              <tr className="uppercase">
                <th className="truncate">Profile Photo</th>
                <th className="truncate">Employee Id</th>
                <th> Name</th>
                <th> Designation</th>
                <th> Gender</th>
                <th> Email</th>
                <th> Mobile</th>
                <th> Course</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="mt-10 divide-y divide-gray-200">
              {employee.slice(offset, offset + PER_PAGE).map((emp, index) => {
                return (
                  <tr key={index} className="p-40">
                    <td className="flex justify-center">
                      <img
                        src={`http://localhost:5000/images/${emp.employee_profile_photo}`}
                        alt=""
                        className="w-10 rounded-full"
                      />
                    </td>
                    <td>{emp.employee_Id}</td>
                    <td className="font-semibold">{emp.employee_name}</td>
                    <td className="">
                      {emp.employee_designation === "Manager" ? (
                        <p className="px-1 py-1 text-white bg-green-500 rounded-md">
                          {emp.employee_designation}
                        </p>
                      ) : emp.employee_designation === "HR" ? (
                        <p className="px-1 py-1 text-white bg-blue-500 rounded-md">
                          {emp.employee_designation}
                        </p>
                      ) : emp.employee_designation === "Sales" ? (
                        <p className="px-1 py-1 text-white bg-red-500 rounded-md ">
                          {emp.employee_designation}
                        </p>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td>{emp.employee_gender}</td>
                    <td>{emp.employee_email}</td>
                    <td>{emp.employee_mobile}</td>
                    <td>{emp.employee_course}</td>
                    <td>{emp.joinedAt.substring(0, 10)}</td>
                    <td className="flex items-center justify-center gap-4 mb-4">
                      <FaEdit
                        className="text-xl text-blue-600"
                        onClick={() => handleEditModal(emp)}
                      />
                      <FaEye
                        className="text-2xl text-green-600"
                        onClick={() => handleViewModal(emp)}
                      />
                      <TiDelete
                        className="text-3xl text-red-600"
                        onClick={() => handleDelete(emp)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-center mt-4 mb-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination  justify-content-center"}
              pageClassName={"page-item "}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active primary"}
            />
          </div>

          {isModalOpen && (
            <EditModal
              employee={selectedEmployee}
              closeModal={closeModal}
              onEditSuccess={onhandleEditSuccess}
            />
          )}
          {viewModal && (
            <ViewEmployee
              employee={selectedEmployee}
              closeViewModal={closeViewModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Employees;
