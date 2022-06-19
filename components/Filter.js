import React from "react";
import { HiFilter } from "react-icons/hi";

function Filter() {
  const brands = ["Nike", "Adidas", "Puma", "Reebok"];
  return (
    <div className="w-[35%] h-screen bg-white p-4 drop-shadow-lg">
      <div className="border-b-2 border-slate-500">
        <span className="flex items-center mb-1">
          <HiFilter className="mr-2" />
          Filters
        </span>
      </div>
      <div className="brands mt-4">
        <h2 className="font-semibold mb-2">Brands</h2>
        {brands.map((text, index) => (
          <div key={`${index}_${text}`} className="flex items-center mb-3">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
