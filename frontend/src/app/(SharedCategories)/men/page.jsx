import ShopCategory from "@/components/ShopCategory";
import menBanner from "../../../Assets/Frontend_Assets/banner_men2.png";
import React from "react";

const page = () => {
  return (
    <>
      <ShopCategory banner={menBanner} category="men" />
    </>
  );
};

export default page;
