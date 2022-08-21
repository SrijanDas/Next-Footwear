import React from "react";

function OrderCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((item, index) => (
        <div key={index} className="animate-pulse flex flex-col gap-2">
          <div className="w-28 h-7 bg-slate-200 rounded"></div>
          <div className="w-72 h-6  bg-slate-200 rounded"></div>
          <div className="w-72 h-6  bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default OrderCardSkeleton;
