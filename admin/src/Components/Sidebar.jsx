import Image from "next/image";
import Link from "next/link";
import React from "react";
import addProductIcon from "../Assets/Admin_Assets/Product_Cart.svg";
import listProductIcon from "../Assets/Admin_Assets/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <div className="flex justify-center mt-12 bg-white w-full h-14 md:h-[730px] md:w-[200px] md:border-r-2 border-gray-300">
      <div className="flex md:flex-col items-center justify-center md:justify-start md:mt-10 gap-4 ">
        <div className="">
          <Link href={"/addproduct"} className="md:mb-2 ">
            <div className="flex  items-center justify-center gap-1 cursor-pointer hover:bg-purple-50 p-2 md:px-8 rounded-sm">
              <Image
                src={addProductIcon}
                alt=""
                className="w-5 md:w-6 h-auto"
              />
              <p className="font-bold text-sm sm:text-base text-gray-800">
                Add Product
              </p>
            </div>
          </Link>
        </div>
        <div>
          <Link href={"/listproduct"} className="">
            <div className="flex items-center justify-center gap-1 cursor-pointer hover:bg-purple-50 p-2 md:px-8 rounded-sm">
              <Image
                src={listProductIcon}
                alt=""
                className="w-5 md:w-6 h-auto"
              />
              <p className="font-bold text-sm sm:text-base text-gray-800">
                Product List
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
