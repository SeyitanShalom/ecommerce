import React from "react";
import Image from "next/image";
import handIcon from "../Assets/Frontend_Assets/hand_icon.png";
import heroImage from "../Assets/Frontend_Assets/hero_image.png";
import arrow from "../Assets/Frontend_Assets/arrow.png";

const Hero = () => {
  return (
    <div className="flex items-center px-16 md:px-20 lg:px-40 h-screen bg-gradient-to-b from-purple-600 via-purple-200 to-transparent">
      <div className="flex-1/2 flex flex-col justify-center items-start ">
        <p className="text-sm sm:text-lg md:text-xl uppercase font-semibold mb-3">
          new arrivals only
        </p>
        <p className="flex text-4xl  lg:text-[50px] font-semibold leading-0 items-center">
          new{" "}
          <Image
            src={handIcon}
            alt=""
            width={80}
            height={80}
            className="w-10 lg:translate-y-2 lg:mb-2"
          />
        </p>
        <p className=" text-4xl md:text-[45px] lg:text-[50px] xl:text-[65px] font-bold">
          collections <br /> for everyone
        </p>
        <button className="flex items-center justify-center bg-purple-500 text-sm  text-white mt-10 px-5 py-3 rounded-4xl font-bold gap-2 transition-all duration-300 hover:cursor-pointer hover:bg-purple-400">
          <p>Latest Collection</p>
          <Image
            src={arrow}
            alt="arrow"
            width={13}
            height={13}
            className="translate-y-[1.5px]"
          />
        </button>
      </div>
      <div className="w-[200px] sm:w-[250px] md:w-[350px] lg:w-[400px]">
        <Image src={heroImage} alt="" />
      </div>
    </div>
  );
};

export default Hero;
