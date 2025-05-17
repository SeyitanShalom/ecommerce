import Image from "next/image";
import React from "react";
import arrowIcon from "../Assets/Frontend_Assets/breadcrum_arrow.png";

const Breadcrumbs = ({ product }) => {
  return (
    <div className="flex text-sm gap-1 items-center my-10 ">
      Home <Image src={arrowIcon} alt="" className="w-1.5" /> Shop{" "}
      <Image src={arrowIcon} alt="" className="w-1.5" /> {product.category}{" "}
      <Image src={arrowIcon} alt="" className="w-1.5" /> {product.name}
    </div>
  );
};

export default Breadcrumbs;
