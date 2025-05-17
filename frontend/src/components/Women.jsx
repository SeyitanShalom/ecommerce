"use client";
import React, { useEffect, useState } from "react";
import Item from "./Item";

const Women = () => {
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((res) => res.json())
      .then((data) => setWomenProducts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="my-20">
      <div className="flex flex-col items-center  justify-center  mb-10">
        <p className="text-2xl md:text-3xl lg:text-4xl">POPULAR IN WOMEN</p>
        <hr className="h-[3px] border-none bg-gray-900 rounded-full w-40 md:w-48 lg:w-60 mx-auto my-1" />
      </div>

      <div className=" flex justify-center m-5 ">
        <div className=" flex flex-wrap justify-center gap-x-10 ">
          {womenProducts.map((item, i) => (
            <div key={i} className="w-40 md:w-48 lg:w-56">
              <Item
                name={item.name}
                image={item.image}
                oldPrice={item.old_price}
                newPrice={item.new_price}
                productId={item.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;
