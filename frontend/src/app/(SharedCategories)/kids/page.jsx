import ShopCategory from "@/components/ShopCategory";
import React from "react";
import kidsBanner from "../../../Assets/Frontend_Assets/banner_kids2.png";

const page = () => {
  return (
    <>
      <ShopCategory banner={kidsBanner} category="kid" />
    </>
  );
};

export default page;
