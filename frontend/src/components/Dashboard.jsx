import React from "react";
import background from "./../assets/background-1.png";
import { HiUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaChartPie,
} from "react-icons/fa";
import { MdAccountBalance, MdEmojiEvents } from "react-icons/md";
import MaleFemaleEmployees from "./MaleFemaleEmployees";
import DesignationDistribution from "./DesignationDistribution";
import CourseDistribution from "./CourseDistribution";

const Dashboard = () => {
  return (
    <div
      className="px-[5vw] mt-20"
      style={{
        width: "100vw",
        height: "90vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="pt-5 text-4xl">
        Welcome {localStorage.getItem("username")}!
      </h1>
      <p className="text-gray-500">
        Measure How Fast You’re Growing Monthly Recurring Revenue. Learn More
      </p>
      
      <div className="flex flex-col gap-4 mt-10 md:flex-col lg:flex-row">
        <Link to="/employees">
          <div className="w-[300px] bg-white h-[150px] rounded-lg flex justify-center items-center flex-col m-auto  hover:scale-105 transition-transform duration-300 shadow-lg md:w-full lg:w-[300px]">
            <HiUserGroup className="text-5xl" />
            <p>Employees</p>
          </div>
        </Link>
        
        <div className="w-[300px] bg-white h-[150px] rounded-lg flex justify-center items-center flex-col m-auto  hover:scale-105 transition-transform duration-300 shadow-lg md:w-full lg:w-[300px]">
          <FaCalendarAlt className="text-5xl" />
          <p>Events</p>
        </div>
        
        <div className="w-[300px] bg-white h-[150px] rounded-lg flex justify-center items-center flex-col m-auto  hover:scale-105 transition-transform duration-300 shadow-lg md:w-full lg:w-[300px]">
          <MdAccountBalance className="text-5xl" />
          <p>Accounts</p>
        </div>
        
        <div className="w-[300px] bg-white h-[150px] rounded-lg flex justify-center items-center flex-col m-auto  hover:scale-105 transition-transform duration-300 shadow-lg md:w-full lg:w-[300px]">
          <MdEmojiEvents className="text-5xl" />
          <p>Achievements</p>
        </div>
        
        <div className="w-[300px] bg-white h-[150px] rounded-lg flex justify-center items-center flex-col m-auto  hover:scale-105 transition-transform duration-300 shadow-lg md:w-full lg:w-[300px]">
          <FaChartPie className="text-5xl" />
          <p>Report</p>
        </div>
        
      </div>

      <div className="flex flex-col gap-10 m-auto mt-10 lg:flex-row md:flex-col">
        <MaleFemaleEmployees />
        <DesignationDistribution />
        <CourseDistribution />
      </div>

    </div>
  );
};

export default Dashboard;
