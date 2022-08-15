import React from "react";
import { HiStar } from "react-icons/hi";

function Rating({ rating = 2.9 }) {
  const bgColor = rating >= 3 ? "bg-green-600" : "bg-yellow-600";
  return (
    <div
      className={`h-8 w-16 p-2 ${bgColor} flex items-center justify-center gap-1 text-lg font-semibold text-white rounded`}
    >
      {rating} <HiStar className="h-5 w-5" />
    </div>
  );
}

export default Rating;
