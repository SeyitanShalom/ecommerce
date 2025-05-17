import React from "react";

const Newsletter = () => {
  return (
    <div className="flex justify-center items-center mx-2">
      <div className="w-full md:w-[700px] lg:w-[1000px] h-[200px] bg-gradient-to-b from-purple-400 via-purple-100 to-transparent mb-20 flex flex-col items-center pt-12 ">
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
          Get Exclusive Offers On Your Email
        </p>
        <div className="flex items-center justify-between mt-10 border-2 border-gray-300 pl-5 rounded-full w-[350px] md:w-[400px] lg:w-[500px]">
          <input
            type="email"
            name=""
            id=""
            placeholder="Input your email..."
            className="w-2/3 outline-none text-sm"
          />
          <button className="bg-purple-500 transition-all duration-300 font-bold  text-white hover:bg-purple-400 rounded-full py-1 md:py-3 px-3 md:px-5 hover:cursor-pointer text-sm ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
