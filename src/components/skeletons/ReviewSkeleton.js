import React from "react";

function ReviewSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-2">
      <div className="w-28 h-8 bg-slate-200 rounded"></div>
      <div className="w-60 h-6 bg-slate-200 rounded"></div>
    </div>
  );
}

export default ReviewSkeleton;
