import React from "react";
import background from "./../assets/background-1.png";
import Lottie from "lottie-react";
import arrow from "./../assets/arrow-1.json";
import clootrack from "./../assets/clootrack.png";
import dukaan from "./../assets/dukaan.png";
import growthx from "./../assets/growthx_1.png";
import krater from "./../assets/krater.png";
import zasos from "./../assets/zasos.png";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const notify = () => toast("Login to Get Started");

  return (
    <div
      className="flex flex-col items-center justify-center overflow-hidden md:pt-24 pt-28"
      style={{
        width: "100vw",
        height: "90vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="text-center text-[20px] ">
        Organize your team with our{" "}
        <span className="text-black font-semibold text-[21px]">OpenHRMS</span>
      </p>
      <h1 className="text-4xl text-center jost md:text-8xl">
        Human Resource Management Systems
      </h1>
      <p className="text-center md:text-2xl md:w-[600px] mt-7 text-xl w-[380px]">
        Our HRMS gives you all the necessary tools to build, manage, and
        motivate your workforce.Manage all your people in one place.
      </p>
      <button
        className="relative flex items-center gap-1 px-4 py-2 mt-5 text-xl text-white bg-black rounded-md"
        onClick={notify}
      >
        Get Started
        <Lottie animationData={arrow} className="w-8" />
      </button>
      <Toaster />
      <div className="flex flex-col items-center mt-10 md:mt-24">
        <p className="text-xl font-semibold text-center md:text-2xl">
          Trusted by 200+ businesses worldwide.
        </p>
        <p>Get inspired by a few of them.</p>

        <div className="mt-16 logos">
          <div className="logos-slide">
            <img src={dukaan} alt="" className="logo" />
            <img src={clootrack} alt="" className="logo" />
            <img src={krater} alt="" className="logo" />
            <img src={zasos} alt="" className="logo" />
            <img src={growthx} alt="" className="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
