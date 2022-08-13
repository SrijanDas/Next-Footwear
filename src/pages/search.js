import React, { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/shared/ProductCard";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { HiFilter, HiSortAscending } from "react-icons/hi";
import SorterModal from "../components/filters/SorterModal";
import FilterModal from "../components/filters/FilterModal";

function search(pageProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = useState(pageProps.products);

  // *****
  // sorting
  // *****
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const toggleSortModal = () => setSortModalOpen(!sortModalOpen);
  const [sortMethod, setSortMethod] = useState("popularity");

  const handleSortMethodChange = (method) => {
    setSortMethod(method);
    if (method === "low-to-high") {
      setProducts(products.sort((a, b) => a.starting_price - b.starting_price));
    } else if (method === "high-to-low") {
      setProducts(products.sort((a, b) => b.starting_price - a.starting_price));
    } else {
      setProducts(products.sort((a, b) => a.date_added - b.date_added));
    }

    toggleSortModal();
  };

  // *****
  // filtering
  // *****

  // const [filterModalOpen, setFilterModalOpen] = useState(false);
  // const toggleFilterModal = () => setFilterModalOpen(!filterModalOpen);

  useEffect(() => {
    dispatch({
      type: "SEARCH_END",
    });
  }, [dispatch, router.asPath]);

  return (
    <div className="md:p-20">
      <div className="flex items-center w-full md:justify-end btn-group mb-2">
        <button
          onClick={toggleSortModal}
          className="btn btn-ghost gap-2 w-1/2 md:w-auto rounded-none md:rounded-md border-r-2 border-r-slate-200 shadow-md"
        >
          <HiSortAscending className="h-5 w-5" />
          Sort
        </button>
        {/* <button
          onClick={toggleFilterModal}
          className="btn btn-ghost gap-2 w-1/2 md:w-auto rounded-none md:rounded-md border-l-2 border-l-slate-200 shadow-md"
        >
          <HiFilter className="h-5 w-5" />
          Filter
        </button> */}
        <SorterModal
          isOpen={sortModalOpen}
          onClose={toggleSortModal}
          sortMethod={sortMethod}
          handleSortMethodChange={handleSortMethodChange}
        />
        {/* <FilterModal isOpen={filterModalOpen} onClose={toggleFilterModal} /> */}
      </div>
      <div className="h-screen md:mt-5">
        {products.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
}

export default search;

export async function getServerSideProps(req, res) {
  //   const newProducts = res.data;
  const query = req.query.q;
  const serverRes = await axios.get(`/products?q=${query}`);
  const products = serverRes.data;
  return {
    props: {
      products,
    },
  };
}
