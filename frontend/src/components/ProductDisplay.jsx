import Image from "next/image";
import React, { useContext, useState } from "react";
import starIcon from "../Assets/Frontend_Assets/star_icon.png";
import starDullIcon from "../Assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from "@/Context/ShopContext";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [size, setSize] = useState();

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size before adding to cart.");
    }
    addToCart(product.id, size);
    //  alert("Product added to cart successfully!");
  };

  return (
    <div className="flex max-w-5xl flex-col sm:flex-row items-center sm:items-start gap-5">
      <div className="flex flex-shrink-0  sm:flex-col-reverse lg:flex-row justify-center gap-2  ">
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink lg:shrink-0">
          <Image
            src={product.image}
            alt=""
            className=" w-20 sm:w-[69px] md:w-[74px] lg:w-[80px]"
            width={100}
            height={100}
          />
          <Image
            src={product.image}
            alt=""
            className=" w-20 sm:w-[69px] md:w-[74px] lg:w-[80px]"
            width={100}
            height={100}
          />
          <Image
            src={product.image}
            alt=""
            className=" w-20 sm:w-[69px] md:w-[74px] lg:w-[80px]"
            width={100}
            height={100}
          />
          <Image
            src={product.image}
            alt=""
            className=" w-20 sm:w-[69px] md:w-[74px] lg:w-[80px]"
            width={100}
            height={100}
          />
        </div>

        <div>
          <Image
            src={product.image}
            alt=""
            className="w-[350px] sm:min-w-[300px] sm:max-w-[300px] md:min-w-[320px] md:max-w-[320px] lg:min-w-[335px] lg:max-w-[335px]"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className="flex  flex-col w-full items-start justify-start sm:mt-3 gap-5">
        <h2 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold sm:font-bold leading-5 text-gray-800">
          {product.name}
        </h2>
        <div
          className="flex items-center gap-1 w-20 sm:w-[80px]
        "
        >
          <Image src={starIcon} alt="" />
          <Image src={starIcon} alt="" />
          <Image src={starIcon} alt="" />
          <Image src={starIcon} alt="" />
          <Image src={starDullIcon} alt="" />
        </div>
        <div className="flex items-center sm:text-sm gap-3">
          <p className="text-gray-600 font-bold line-through">
            ${product.old_price}
          </p>
          <p className="text-purple-600 font-bold">${product.new_price}</p>
        </div>
        <p className="text-gray-700 text-sm sm:text-xs sm:font-medium font-medium">
          A lightweight, usually knitted shirt, close-fitting and with a round
          neckline and short sleeves, worn as an undershirt or outer garment.
        </p>
        <div>
          <p className="text-gray-600 text-lg sm:text-base font-semibold">
            Select Size
          </p>
          <div className="flex items-center gap-3 text-sm font-semibold text-gray-700 mt-1">
            <button
              className="bg-purple-50 px-3 py-2.5 sm:px-2 sm:py-1.5 hover:cursor-pointer rounded-lg flex justify-center items-center"
              value={"S"}
              onClick={(e) => setSize(e.target.value)}
            >
              S
            </button>
            <button
              className="bg-purple-50 px-3 py-2.5 sm:px-2 sm:py-1.5 hover:cursor-pointer rounded-lg flex justify-center items-center"
              value={"M"}
              onClick={(e) => setSize(e.target.value)}
            >
              M
            </button>
            <button
              className="bg-purple-50 px-3 py-2.5 sm:px-2 sm:py-1.5 hover:cursor-pointer rounded-lg flex justify-center items-center"
              value={"L"}
              onClick={(e) => setSize(e.target.value)}
            >
              L
            </button>
            <button
              className="bg-purple-50 px-3 py-2.5 sm:px-2 sm:py-1.5 hover:cursor-pointer rounded-lg flex justify-center items-center"
              value={"XL"}
              onClick={(e) => setSize(e.target.value)}
            >
              XL
            </button>
            <button
              className="bg-purple-50 px-3 py-2.5 sm:px-2 sm:py-1.5 hover:cursor-pointer rounded-lg flex justify-center items-center"
              value={"XXL"}
              onClick={(e) => setSize(e.target.value)}
            >
              XXL
            </button>
          </div>
        </div>
        <button
          className="bg-purple-500 px-5 py-3 mt-7 text-white text-sm sm:text-xs font-semibold rounded-sm hover:cursor-pointer"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
