"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import cancel from "../../Assets/Frontend_Assets/cart_cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      await fetch("http://localhost:4000/allproducts")
        .then((res) => res.json())
        .then((data) => {
          setAllProducts(data);
        });
    };
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllProducts(allProducts.filter((item) => item.id !== id));
        }
      });
  };

  return (
    <div className="max-w-[700px] bg-white m-5 rounded-md mt-7 md:mt-24 md:absolute md:top-0 md:left-116 lg:left-140 md:transform md:-translate-x-1/2 md:w-[550px] lg:w-[700px]">
      {/* <h1 className="text-xl font-bold text-gray-800 mb-3">
        All Products List
      </h1>
      <div className="w-full">
        <div className="overflow-y-auto -full overflow-x-auto  max-h-140">
          <table className="text-center min-w-[700px] max-w-4xl mx-auto bg-white">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                <th className="p-2 px-3 text-sm">Products</th>
                <th className="p-2 px-3 text-sm">Title</th>
                <th className="p-2 px-3 text-sm">Old Price</th>
                <th className="p-2 px-3 text-sm">New Price</th>
                <th className="p-2 px-3 text-sm">Category</th>
                <th className="p-2 px-3 text-sm">Remove</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((item) => (
                <tr
                  key={item.id}
                  className="border-b-2 border-b-gray-200 hover:bg-purple-50"
                >
                  <td className="p-4 flex justify-center items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-10 rounded-full"
                    />
                  </td>
                  <td className="p-4 text-xs">{item.name}</td>
                  <td className="p-4 text-xs">${item.old_price}</td>
                  <td className="p-4 text-xs">${item.new_price}</td>
                  <td className="p-4 text-xs">{item.category}</td>
                  <td className="p-4">
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="bg-purple-200 px-3.5 py-2 rounded-sm hover:cursor-pointer"
                    >
                      <Image src={cancel} alt="" width={12} height={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <h1 className="text-lg text-center font-bold text-gray-800 mb-3">
        All Products List
      </h1>
      <div className="w-full flex flex-col py-2 px-4 overflow-y-auto overflow-x-auto max-h-144 md:max-h-152 custom-scrollbar">
        {allProducts.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex items-center justify-evenly gap-x-3 border-b-2 border-gray-200 py-2 "
          >
            <Image
              src={item.image}
              alt={item.name}
              className="min-w-20 rounded-xs "
              width={50}
              height={50}
            />
            <div className="flex flex-col items-between gap-4 w-full justify-start">
              <div className=" flex flex-col gap-1">
                <h2
                  className="
    text-sm sm:text-base font-bold text-gray-700
    truncate overflow-hidden whitespace-nowrap max-w-[50vw]
    sm:whitespace-normal sm:overflow-visible sm:max-w-none
  "
                >
                  {item.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  <span>
                    Old Price:{" "}
                    <span className="line-through">${item.old_price}</span>
                  </span>{" "}
                  |{" "}
                  <span>
                    New Price:{" "}
                    <span className="font-bold">${item.new_price}</span>
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Category: {item.category}
                </p>

                {/* <p className="text-xs sm:text-sm text-gray-500">
                  Old Price: ${item.new_price}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  New Price: ${item.new_price}
                </p> */}
              </div>
            </div>
            <button
              onClick={() => {
                console.log("Cart data:", cartItems);
                console.log("Trying to remove:", item.id, item.size);
                removeFromCart(item.id, item.size);
              }}
              className="bg-purple-200 rounded-sm hover:cursor-pointer  w-16 h-8 flex items-center justify-center"
            >
              <Image src={cancel} alt="" width={12} height={12} />
              {/* <p className=" text-xs font-bold text-gray-900">Remove</p> */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
