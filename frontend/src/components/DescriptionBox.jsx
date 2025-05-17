import React from "react";

const DescriptionBox = () => {
  return (
    <div className=" flex flex-col mt-20">
      <div className="flex items-center">
        <div className="border-2 px-4 py-2 border-gray-300 text-sm">
          Description
        </div>
        <div className="border-2 px-4 py-2 border-gray-300 text-sm translate-x-[-2px]">
          Review
        </div>
      </div>
      <hr className="h-0.5 border-none bg-gray-300 rounded-full w-full mx-auto translate-y-[-2px]" />

      <p className="mt-3 text-gray-600 text-[13px] font-medium">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
        praesentium modi molestias, suscipit nesciunt obcaecati. Rerum culpa
        obcaecati veritatis possimus totam sint quasi fuga laborum aliquid
        asperiores porro, natus molestias. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Unde ipsa, et praesentium voluptatum sit
        ipsam omnis odio repellat rerum consequatur tempore velit corporis
        soluta. Explicabo, laboriosam! Distinctio in non rem. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Incidunt, rerum accusantium vero
        libero, eum quisquam unde rem obcaecati, amet modi a animi sit!
        Recusandae quibusdam porro ad voluptatibus ea repellat?
      </p>
    </div>
  );
};

export default DescriptionBox;
