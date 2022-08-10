import React, { useState, useEffect } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import axios from "../../utils/axios";

import filterList from "../../utils/filterList";
import Brand from "./FilterItems/Brand";
import Price from "./FilterItems/Price";

function FilterModal({
  selectedBrands,
  setSelectedBrands,
  clearFilters,
  isOpen,
  onClose,
  appliedFilters,
  setAppliedFilters,
}) {
  const [page, setPage] = useState("brand");

  // handling brand filter
  const [brandList, setBrandList] = useState([]);

  const handleBrandChange = async (brand) => {
    const value = brand;

    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }

    if (!appliedFilters.includes("brand")) {
      setAppliedFilters([...appliedFilters, "brand"]);
    }
  };

  // *****
  // fetching brand list
  // *****
  useEffect(() => {
    axios.get("/brand-list").then((res) => {
      setBrandList(res.data);
    });
  }, []);

  return (
    <div
      className={`modal ${
        isOpen ? "modal-open" : "modal-closed"
      } modal-bottom sm:modal-middle`}
    >
      <div className="modal-box p-0">
        <div className="flex px-5 pt-6 items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn btn-sm btn-circle">
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
                  onClick={() => setPage(filter.value)}
                  key={index}
                  className={`transition ease-in duration-200 p-4 cursor-pointer ${
                    page === filter.value
                      ? "bg-white"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                >
                  {filter.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full">
            {page === "price" ? (
              <Price />
            ) : page === "brand" ? (
              <Brand
                brandList={brandList}
                selectedBrands={selectedBrands}
                handleBrandChange={handleBrandChange}
              />
            ) : (
              <> </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
