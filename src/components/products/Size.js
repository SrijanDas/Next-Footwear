import React, { memo } from "react";
const sizes = [6, 7, 8, 9, 10];

function Size({ selectedSize, availableSizes, handleSizeChange }) {
  return (
    <div className="my-2">
      <span className="mb-2 ">Sizes:</span>
      <div className="mt-2">
        {sizes.map((size, index) =>
          availableSizes.includes(String(size)) ? (
            <button
              onClick={() => handleSizeChange(size)}
              key={index}
              type="button"
              className={`h-12 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 ${
                selectedSize === size ? "bg-blue-100" : "bg-white"
              } focus:outline-none rounded-lg border border-gray-200 ${
                selectedSize !== size && "hover:bg-gray-100 hover:text-blue-700"
              } focus:z-10 focus:ring-4`}
            >
              {size}
            </button>
          ) : (
            <button
              key={index}
              className="btn btn-ghost py-2.5 px-5 mr-2 mb-2"
              disabled
            >
              {size}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default memo(Size);
