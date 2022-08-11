import React from "react";

function FilterItemSkeleton() {
  return (
    <div className="py-3 px-4 flex flex-col gap-3">
      {Array.from({ length: 4 }).map((item, index) => (
        <div key={index} className="animate-pulse h-7 flex gap-2">
          <div className="w-9 bg-slate-200 rounded"></div>
          <div className="w-28  bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default FilterItemSkeleton;
