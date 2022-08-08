import React, { useState, useEffect } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import Brand from "./FilterItems/Brand";
import Price from "./FilterItems/Price";

const filterList = [
  {
    name: "Price",
    component: <Price />,
  },
  {
    name: "Brand",
    component: <Brand />,
  },
  {
    name: "Customer Ratings",
    component: <> </>,
  },
  {
    name: "Color",
    component: <> </>,
  },
  {
    name: "Size",
    component: <> </>,
  },
  {
    name: "Category",
    component: <> </>,
  },
  {
    name: "Shoe Type",
    component: <> </>,
  },
];

function FilterModal({ isOpen, onClose }) {
  const clearFilters = () => {
    console.log("clear filters");
  };

  const [page, setPage] = useState(0);
  const [filterItem, setFilterItem] = useState(filterList[0].component);

  useEffect(() => {
    setFilterItem(filterList[page].component);
  }, [page]);

  return (
    <div className={`modal ${isOpen && "modal-open"} modal-bottom`}>
      <div className="modal-box px-0">
        <div className="flex px-5 items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn btn-xs btn-circle">
              <HiArrowSmLeft className="h-5 w-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-500 uppercase">
              Filters
            </h3>
          </div>
          <button
            onClick={clearFilters}
            className="text-blue-500 uppercase font-bold"
          >
            Clear Filters
          </button>
        </div>

        <div className="divider mb-0"></div>
        <div className="flex h-screen">
          <div className="w-1/4 h-full bg-slate-200">
            <ul>
              {filterList.map((filter, index) => (
                <li
                  onClick={() => setPage(index)}
                  key={index}
                  className={`transition ease-in duration-200 p-4 cursor-pointer ${
                    page === index
                      ? "bg-white"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                >
                  {filter.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full">{filterItem}</div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
