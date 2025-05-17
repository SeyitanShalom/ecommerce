import Image from "next/image";
import React from "react";
import logo from "../Assets/Frontend_Assets/logo.png";
import Link from "next/link";
import { FaPinterest } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex justify-center items-center mt-10 mb-10">
      <div className="flex flex-col items-center justify-center gap-y-5">
        <div className="flex items-center gap-1">
          <Image src={logo} alt="" className="w-6" />
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black">
            SHOPPER
          </h1>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm font-semibold">
          <Link href="">Company</Link>
          <Link href="">Product</Link>
          <Link href="">Offices</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
        </div>
        <div className="flex items-center justify-between gap-7 border-2 border-gray-200 px-4 py-1 rounded-lg hover:cursor-pointer ">
          <Link href={"/"}>
            <FaSquareInstagram />
          </Link>
          <Link href={"/"}>
            <FaPinterest />
          </Link>
          <Link href={"/"}>
            <FaSquareWhatsapp />
          </Link>
        </div>
        <hr className="h-0.5 border-none bg-gray-500 rounded-full w-[400px] sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] 2xl:w-[1000px] mx-auto" />
        <div>
          <p className="text-sm md:text-base">
            Copyright @ 2025 - All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
