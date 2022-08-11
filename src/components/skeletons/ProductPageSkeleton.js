import React from "react";

function ProductPageSkeleton() {
  return (
    <div className="productPageSkeleton h-screen mb-10">
      <div className="h-auto p-5 flex flex-col lg:flex-row lg:p-20">
        <div className="leftSide flex flex-col items-center w-full lg:w-[40%] ">
          <div className="h-80 lg:h-[28rem] w-full bg-slate-200 animate-pulse"></div>
          <div className="mt-4 flex gap-2 w-full">
            <button className="w-1/2 bg-slate-200 animate-pulse"></button>
            <button className="h-12 gap-2 bg-slate-200 animate-pulse w-1/2"></button>
          </div>
        </div>
        <div className="rightSide px-1 py-0 lg:w-[40%] lg:px-10 animate-pulse">
          <div className="mt-5 flex flex-col gap-2">
            <div className="h-10 w-10 bg-slate-200 rounded"></div>
            <div className="h-4 w-56 bg-slate-200 rounded"></div>
            <div className="h-10 w-32 bg-slate-200 rounded"></div>
            <div className="mt-4 h-5 w-8 bg-slate-200 rounded"></div>
            <div className="h-16 w-64 bg-slate-200 rounded"></div>
            <div className="mt-4 h-5 w-8 bg-slate-200 rounded"></div>
            <div className="h-16 w-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPageSkeleton;
