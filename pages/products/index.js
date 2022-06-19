import React from "react";
import ProductCard from "../../components/ProductCard";
import { HiFilter, HiSortAscending } from "react-icons/hi";
import Filter from "../../components/Filter";
import products from "../../dummyData";

const MobileFilter = () => {
  return (
    <div className="p-4 md:hidden flex items-center justify-center gap-4">
      <button className="flex gap-1 items-center btn-black-outlined ">
        <HiSortAscending />
        Sort
      </button>
      <button className="flex gap-1 items-center btn-black-outlined ">
        <HiFilter />
        Filter
      </button>
    </div>
  );
};

function Products() {
  return (
    <>
      <MobileFilter />

      <div className="flex gap-4">
        <div className="hidden md:contents">
          <Filter />
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4 p-2 md:pt-10 md:pr-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <div className="h-full"></div>
        </div>
      </div>
    </>
  );
}

export default Products;
