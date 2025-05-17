import React from "react";
import navLogo from "../Assets/Admin_Assets/nav-logo.svg";
import navProfile from "../Assets/Admin_Assets/nav-profile.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex fixed left-0 top-0 w-full items-center justify-between bg-white border-b-2 border-gray-300 px-5 py-2 sm:px-6 md:px-10 lg:px-14 lg:py-4">
      <div>
        <Image
          src={navLogo}
          alt="logo"
          className="w-32 sm:w-36 lg:w-40 h-auto"
        />
      </div>
      <div>
        <Image
          src={navProfile}
          alt="profile"
          className="w-10 sm:w-12  lg:w-16 h-auto"
        />
      </div>
    </div>
  );
};

export default Navbar;
