import React, { useEffect, useState } from "react";
import ProductCard from "../../components/shared/ProductCard";
import axios from "../../utils/axios";
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
      setProducts(
        products.sort((a, b) => new Date(a.date_added) - new Date(b.date_added))
      );
    }

    toggleSortModal();
  };

  // *****
  // filtering
  // *****

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const toggleFilterModal = () => setFilterModalOpen(!filterModalOpen);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const clearFilters = () => {
    setProducts(pageProps.products);
    toggleFilterModal();
    setAppliedFilters([]);
    setSelectedBrands([]);
  };

  useEffect(() => {
    const filterProducts = () => {
      let filteredProducts = pageProps.products.filter((product) => {
        if (selectedBrands.includes(product.brand.slug)) {
          return product;
        }
      });
      setProducts(filteredProducts);
    };

    if (selectedBrands.length > 0) {
      filterProducts();
    } else {
      setProducts(pageProps.products);
    }

    if (selectedBrands.length === 0) {
      setAppliedFilters([]);
    }
    console.log(selectedBrands);
  }, [selectedBrands]);

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
            {appliedFilters.length > 0 && (
              <div className="badge badge-md badge-primary">
                {appliedFilters.length}
              </div>
            )}
          </button>
          <SorterModal
            isOpen={sortModalOpen}
            onClose={toggleSortModal}
            sortMethod={sortMethod}
            handleSortMethodChange={handleSortMethodChange}
          />
          <FilterModal
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            clearFilters={clearFilters}
            isOpen={filterModalOpen}
            onClose={toggleFilterModal}
          />
        </div>
        {products.length > 0 ? (
          <div className="h-screen md:mt-5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          "No products found"
        )}
      </div>
    </>
  );
}

export default Products;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get("/latest-products");
  const products = res.data;

  // Pass data to the page via props
  return { props: { products } };
}
