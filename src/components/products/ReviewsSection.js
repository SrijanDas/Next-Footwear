import React from "react";
import { HiStar } from "react-icons/hi";

const rating = 4;

function ReviewsSection() {
  return (
    <div className="py-5">
      <h1 className="text-2xl font-bold">Customer Reveiews</h1>
      <div className="text-lg text-gray-500 antialiased mb-5 flex gap-2">
        <span className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <HiStar
              key={i}
              className={`w-6 h-6 ${
                i >= rating ? "text-green-200" : "text-green-600"
              } `}
            />
          ))}
        </span>
        <span>{rating} out of 5</span>
      </div>
      {Array.from({ length: rating }).map((_, i) => (
        <div key={i} className="my-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-auto bg-green-600 p-2 flex gap-1 items-center text-lg font-semibold text-white rounded">
              4 <HiStar className="h-5 w-5" />
            </div>
            <span className="font-bold">John</span>
          </div>
          <div>Value for money</div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsSection;
