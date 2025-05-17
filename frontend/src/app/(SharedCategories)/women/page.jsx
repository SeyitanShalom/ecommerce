import ShopCategory from "@/components/ShopCategory";
import React from "react";
import womenBanner from "../../../Assets/Frontend_Assets/banner_women2.png";

const page = () => {
  return (
    <>
      <ShopCategory banner={womenBanner} category="women" />
    </>
  );
};

export default page;
