"use client";

import { useParams } from "next/navigation";
import { ShopContext } from "../../../Context/ShopContext";
import React, { useContext } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductDisplay from "@/components/ProductDisplay";
import DescriptionBox from "@/components/DescriptionBox";
import RelatedProducts from "@/components/RelatedProducts";

export default function ProductPage() {
  const { allProducts } = useContext(ShopContext);
  const params = useParams();
  console.log("Params:", params);
  const productId = params?.productId;

  const product = allProducts?.find((p) => String(p.id) === String(productId));
  console.log("Product ID:", productId);
  console.log("All Products:", allProducts);
  console.log("Matched Product:", product);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="mx-5 md:mx-10 lg:mx-20 flex flex-col">
      <Breadcrumbs product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}
