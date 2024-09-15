import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DesignationDistribution = () => {
  const [distribution, setDistribution] = useState({ totalHR: 0, TotalManager: 0, TotalSales: 0 });

  useEffect(() => {
    //function to get total designation distribution
    const getDesignationDistribution = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee/totaldesignation');
        setDistribution(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDesignationDistribution();
   
  }, []);

  const data = {
    labels: ['HR', 'Manager', 'Sales'],
    datasets: [
      {
        label: ' Employees',
        data: [distribution.totalHR, distribution.TotalManager, distribution.TotalSales],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="h-[400px] md:w-full flex flex-col justify-center items-center  bg-white p-3 shadow-lg w-[350px] lg:w-[600px]">
      <h1 className='text-xl'>Designation Distribution</h1>
      <Bar data={data} options={options}/>
    </div>
  );
};

export default DesignationDistribution;
