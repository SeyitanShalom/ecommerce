"use client";
import React, { useContext } from "react";
import Item from "./Item";
import { ShopContext } from "@/Context/ShopContext";

const RelatedProducts = () => {
  const { allProducts } = useContext(ShopContext);

  if (!allProducts || allProducts.length === 0) {
    return <div>Loading related products...</div>;
  }

  // Shuffle the products and select 4
  const shuffledProducts = [...allProducts].sort(() => 0.5 - Math.random());
  const filteredProducts = shuffledProducts.slice(0, 4);

  return (
    <div className="mt-28">
      <div className="flex flex-col items-center justify-center mb-10">
        <p className="text-2xl md:text-3xl lg:text-4xl">RELATED PRODUCTS</p>
        <hr className="h-[3px] border-none bg-gray-900 rounded-full w-40 md:w-48 lg:w-60 mx-auto my-1" />
      </div>

      <div className="flex justify-center m-5">
        <div className="flex flex-wrap justify-center gap-x-10">
          {filteredProducts.map((item, i) => (
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

export default RelatedProducts;
