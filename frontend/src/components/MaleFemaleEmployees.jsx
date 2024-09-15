import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Function to get male and female employees
const MaleFemaleEmployees = () => {
  const [maleFemale, setMaleFemale] = useState({
    totalMale: 0,
    totalFemale: 0,
  });

  useEffect(() => {
    const getTotalMaleFemale = async () => {
      try {
        await axios
          .get("http://localhost:5000/api/employee/totalmalefemale")
          .then((response) => {
            setMaleFemale(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getTotalMaleFemale();
    
  }, []);

 

  const data = {
    datasets: [
      {
        label: " Employees",
        data: [maleFemale.totalMale, maleFemale.totalFemale],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
    labels: ["Male", "Female"],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
  return (
    <div className="h-[400px] w-[300px] flex flex-col justify-center items-center  bg-white p-3 shadow-lg m-auto md:w-full lg:w-[300px]">
      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="text-xl">Total Employees</h1>
        <p className="text-3xl font-semibold">{maleFemale.totalMale + maleFemale.totalFemale}</p>
      </div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default MaleFemaleEmployees;
