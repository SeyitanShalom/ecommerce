"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Item = ({ name, image, newPrice, oldPrice, productId }) => {
  return (
    <div
      className="mb-20 hover:scale-110 transition duration-500"
      onClick={() => window.scrollTo(0, 0)}
    >
      <Link href={`/product/${productId}`}>
        {console.log("Product ID:", productId)}
        <div>
          <Image src={image} alt="" width={250} height={250} />
        </div>
        <p className="text-[13px] leading-4 mt-1 text-gray-800 font-semibold ">
          {name}
        </p>
        <div className="flex gap-5  mt-2 text-sm  text-gray-800">
          <p className="font-bold">${newPrice}</p>
          <p className="line-through text-gray-500 font-semibold">
            ${oldPrice}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Item;
