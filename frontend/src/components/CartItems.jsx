"use client";
import { ShopContext } from "@/Context/ShopContext";
import Image from "next/image";
import React, { useContext } from "react";
import cancel from "../Assets/Frontend_Assets/cart_cross_icon.png";

const CartItems = () => {
  const { allProducts, cartItems, removeFromCart } = useContext(ShopContext);
  console.log("Cart Items:", cartItems); // Debug log
  console.log("All Products:", allProducts); // Debug log

  // Early return if data isn't ready
  if (!cartItems || !allProducts) {
    return (
      <div className="text-center font-bold text-4xl my-20">Loading...</div>
    );
  }

  // Return empty cart message if cart is empty
  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="text-center font-bold text-2xl md:text-3xl lg:text-4xl my-20">
        Cart is empty
      </div>
    );
  }

  // Transform cart data into displayable rows
  const cartRows = Object.entries(cartItems || {}).flatMap(
    ([itemId, sizes]) => {
      const product = allProducts.find((p) => String(p.id) === String(itemId));
      if (!product) {
        //   console.warn(`Product not found for ID: ${itemId}`); // Debug log
        return [];
      }

      return Object.entries(sizes || {}).map(([size, quantity]) => ({
        id: itemId,
        name: product.name,
        image: product.image,
        new_price: product.new_price,
        size,
        quantity,
      }));
    }
  );

  // If no valid rows could be created, show empty cart
  if (cartRows.length === 0) {
    return (
      <div className="text-center font-bold text-xl my-20">Cart is empty</div>
    );
  }

  const calculateTotal = () => {
    return cartRows.reduce(
      (total, item) => total + item.new_price * item.quantity,
      0
    );
  };

  return (
    <div className="flex flex-col items-center justify-center text-sm font-semibold text-gray-800 mt-10 mx-7 md:mx-16 lg:mx-24">
      <div className="w-full flex flex-col lg:w-11/12">
        {cartRows.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex items-center gap-x-3 border-b-2 border-gray-200 py-2"
          >
            <Image
              src={item.image}
              alt={item.name}
              className="min-w-20 rounded-xs "
              width={50}
              height={50}
            />
            <div className="flex flex-col items-between gap-3 w-full justify-start">
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
                  Size: {item.size}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  ${item.new_price}
                </p>
              </div>
              <div>
                <p> x{item.quantity}</p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-end gap-y-12">
              <button
                onClick={() => {
                  console.log("Cart data:", cartItems);
                  console.log("Trying to remove:", item.id, item.size);
                  removeFromCart(item.id, item.size);
                }}
                className="bg-purple-200 px-3.5 py-1.5 rounded-sm hover:cursor-pointer"
              >
                <Image src={cancel} alt="" width={12} height={12} />
              </button>
              <p className="text-sm text-purple-600">
                ${(item.new_price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-col lg:flex-row w-full lg:w-11/12 lg:gap-x-40">
        <div className=" lg:w-1/2">
          <h1 className="text-xl font-bold text-gray-800 mb-5">Cart Totals</h1>
          <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2 text-gray-500 text-sm font-semibold">
            <p>Subtotal</p>
            <p>${calculateTotal().toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2 my-4 text-gray-500 text-sm font-semibold">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center font-bold text-gray-800">
            <p>Total</p>
            <p>${calculateTotal().toFixed(2)}</p>
          </div>
          <button className="mt-10 bg-purple-500 px-5 py-3 text-white text-xs rounded-xs hover:bg-purple-400 hover:cursor-pointer">
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className=" w-full lg:w-1/2 mt-16 mb-20 ">
          <label htmlFor="promo" className="text-sm text-gray-500">
            If you have a promo code, enter it here
          </label>
          <div className="w-full flex items-center mt-3">
            <input
              type="text"
              name="promo"
              id="promo"
              placeholder="Promo Code"
              className="w-full lg:w-2/3 h-10 outline-none bg-gray-100 text-sm rounded-s-sm px-5"
            />
            <button className="bg-purple-500 transition-all duration-300 font-bold  text-white hover:bg-purple-400 rounded-e-sm w-20 h-10 hover:cursor-pointer ">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
