"use client";
import Image from "next/image";
import React, { useState } from "react";
import upload_area from "../../Assets/Admin_Assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Men",
    old_price: "",
    new_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let responseData;
      let product = productDetails;

      // Upload image
      let formData = new FormData();
      formData.append("product", image);

      const uploadRes = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      responseData = await uploadRes.json();

      if (responseData.success) {
        product.image = responseData.image_url;
        product.old_price = Number(product.old_price);
        product.new_price = Number(product.new_price);

        const res = await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        if (!res.ok) throw new Error("Failed to save product");

        const data = await res.json();

        if (data.success) {
          alert("✅ Product Added!");
          // Reset form
          setProductDetails({
            name: "",
            image: "",
            category: "Men",
            old_price: "",
            new_price: "",
          });
          setImage(false);
        } else {
          alert("❌ Failed to add product.");
        }
      } else {
        alert("❌ Image upload failed.");
      }
    } catch (err) {
      console.error("Add product error:", err);
      alert(`❌ Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" max-w-[700px] bg-white m-5 rounded-md mt-10 md:mt-24 md:absolute md:top-0 md:left-116 lg:left-140 md:transform md:-translate-x-1/2 md:w-[550px] lg:w-[700px]">
      <form
        onSubmit={addProduct}
        className="flex flex-col items-start p-7 sm:p-10 gap-y-5 text-sm font-semibold text-gray-700"
      >
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="name">Product Title</label>
          <input
            onChange={changeHandler}
            value={productDetails.name}
            type="text"
            name="name"
            id="name"
            className="border-2 border-gray-300 py-2 px-3 rounded-sm outline-none"
            placeholder="Type here..."
            required
          />
        </div>

        <div className="flex flex-col  gap-x-5 w-full">
          <div className="flex flex-col w-full gap-2 mb-5">
            <label htmlFor="old_price">Price</label>
            <input
              onChange={changeHandler}
              value={productDetails.old_price}
              type="text"
              name="old_price"
              id="old_price"
              className="border-2 border-gray-300 py-2 px-3 rounded-sm outline-none"
              placeholder="Type here..."
              required
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="new_price">Offer Price</label>
            <input
              onChange={changeHandler}
              value={productDetails.new_price}
              type="text"
              name="new_price"
              id="new_price"
              className="border-2 border-gray-300 py-2 px-3 rounded-sm outline-none"
              placeholder="Type here..."
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category">Product Category</label>
          <select
            onChange={changeHandler}
            value={productDetails.category}
            name="category"
            id="category"
            className="border-2 p-2 rounded-md border-gray-300"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kid">Kid</option>
          </select>
        </div>

        <div>
          <label htmlFor="file-upload" className="cursor-pointer">
            <Image
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Product Preview"
              width={100}
              height={100}
              className="w-28 md:w-32 h-auto"
            />
          </label>
          <input
            type="file"
            name="file-upload"
            id="file-upload"
            hidden
            onChange={imageHandler}
            accept="image/*"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-purple-500 text-white font-bold px-12 md:px-14 py-3 cursor-pointer rounded-sm ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-400"
          }`}
        >
          {isLoading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
