import Image from "next/image";
import React from "react";
import womanImage from "../Assets/Frontend_Assets/exclusive_image.png";

const Banner = () => {
  return (
    <div className="flex justify-center items-center mx-2">
      <div className="w-full md:w-[700px] lg:w-[1000px] h-[200px] bg-gradient-to-b from-purple-400 via-purple-200 to-transparent mb-20">
        <div className="p-10 flex items-center justify-evenly">
          <div>
            <p className="text-4xl md:text-5xl font-bold ">
              Exclusive <br /> Offers For You
            </p>
            <p className="mt-2 text-sm">ONLY BEST SELLING PRODUCTS</p>
            <button className="flex items-center justify-center bg-purple-500 transition-all duration-300  hover:bg-purple-400 text-white mt-5 px-5 py-2 rounded-4xl font-bold text-sm hover:cursor-pointer">
              <p>Check Now</p>
            </button>
          </div>
          <div className="w-60">
            <Image src={womanImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
