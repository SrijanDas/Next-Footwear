import React, { useState } from "react";
import ProductCard from "../../components/shared/ProductCard";
import axios from "../../helpers/axios";
import Head from "next/head";
import { HiFilter, HiSortAscending } from "react-icons/hi";
import SorterModal from "../../components/filters/SorterModal";
import FilterModal from "../../components/filters/FilterModal";

function Products(pageProps) {
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
      setProducts(products.sort((a, b) => b.created_at - a.created_at));
    }

    toggleSortModal();
  };

  // *****
  // filtering
  // *****

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const toggleFilterModal = () => setFilterModalOpen(!filterModalOpen);

  return (
    <>
      <Head>
        <title>NFootwears | Products</title>
        <meta
          name="description"
          content="We ship footwares directly from the brands to your doorsteps..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {products.length > 0 ? (
        <div className="md:p-20">
          <div className="flex items-center w-full md:justify-end btn-group mb-2">
            <button
              onClick={toggleSortModal}
              className="btn btn-ghost gap-2 w-1/2 md:w-auto rounded-none md:rounded-md border-r-2 border-r-slate-200 shadow-md"
            >
              <HiSortAscending className="h-5 w-5" />
              Sort
            </button>
            <button
              onClick={toggleFilterModal}
              className="btn btn-ghost gap-2 w-1/2 md:w-auto rounded-none md:rounded-md border-l-2 border-l-slate-200 shadow-md"
            >
              <HiFilter className="h-5 w-5" />
              Filter
            </button>
            <SorterModal
              isOpen={sortModalOpen}
              onClose={toggleSortModal}
              sortMethod={sortMethod}
              handleSortMethodChange={handleSortMethodChange}
            />
            <FilterModal isOpen={filterModalOpen} onClose={toggleFilterModal} />
          </div>

          <div className="h-screen md:mt-5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        "No products found"
      )}
    </>
  );
}

export default Products;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get("/products/latest-products");
  const products = res.data;

  // Pass data to the page via props
  return { props: { products } };
}
