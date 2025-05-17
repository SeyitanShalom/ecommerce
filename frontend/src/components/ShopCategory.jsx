"use client";
import React, { useContext } from "react";
// import all_product from "../Assets/Frontend_Assets/all_product";
import Image from "next/image";
import Item from "./Item";
import { ShopContext } from "@/Context/ShopContext";

const ShopCategory = ({ banner, category }) => {
  const { allProducts } = useContext(ShopContext);

  console.log("All Products:", allProducts);
  console.log("Category Prop:", category);

  if (!allProducts || allProducts.length === 0) {
    return <div>Loading products...</div>;
  }

  const filteredProducts = allProducts.filter(
    (product) =>
      product.category.trim().toLowerCase() === category.trim().toLowerCase()
  );

  console.log("Filtered Products:", filteredProducts);

  return (
    <div className="flex flex-col justify-start items-center mt-10 ">
      <div className="w-11/12 md:w-9/12 mb-20">
        <Image src={banner} alt="" />
      </div>
      <div>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="flex justify-center m-5">
            <div className="flex flex-wrap justify-center gap-x-10 w-full md:w-11/12 lg:w-9/12">
              {filteredProducts.reverse().map((item, index) => (
                <div key={index} className="w-40 md:w-48 lg:w-56">
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
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
