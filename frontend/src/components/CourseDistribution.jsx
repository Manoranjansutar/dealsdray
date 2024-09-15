import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CourseDistribution = () => {
  const [course, setCourse] = useState({
    totalBSC: 0,
    totalBCA: 0,
    totalMCA: 0,
  });

  useEffect(() => {
    // Function to get total course distribution
    const getTotalCourseDistribution = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee/totalcourse"
        );
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalCourseDistribution();
  }, []);

  const data = {
    labels: ["BSC", "BCA", "MCA"],
    datasets: [
      {
        label: " Employees",
        data: [course.totalBSC, course.totalBCA, course.totalMCA],
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="h-[400px] md:w-full flex flex-col justify-center items-center  bg-white p-3 shadow-lg w-[350px] lg:w-[600px]">
      <h1 className="text-xl">Course Distribution</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default CourseDistribution;
