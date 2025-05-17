"use client";
import React, { useEffect, useState } from "react";
import Item from "./Item";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((res) => res.json())
      .then((data) => setNewCollection(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-60 mb-20">
      <div className="flex flex-col items-center  justify-center  mb-10">
        <p className="text-2xl md:text-3xl lg:text-4xl">NEW COLLECTIONS</p>
        <hr className="h-[3px] border-none bg-gray-900 rounded-full w-40 md:w-48 lg:w-60 mx-auto my-1" />
      </div>

      <div className=" flex justify-center m-5 ">
        <div className=" flex flex-wrap justify-center gap-x-10">
          {/* <div className=" flex justify-center flex-wrap w-[1200px] gap-10 "> */}
          {[...newCollection].reverse().map((item, i) => (
            <div key={i} className="w-40 md:w-48 lg:w-56">
              <Item
                id={item.id}
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

export default NewCollections;
