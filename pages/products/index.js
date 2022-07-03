import React from "react";
import ProductCard from "../../components/ProductCard";
import { HiFilter, HiSortAscending } from "react-icons/hi";
import Filter from "../../components/Filter";
import axios from "../../helpers/axios";
import Head from "next/head";

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

function Products({ data }) {
  const products = data;
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
      <MobileFilter />

      <div className="flex gap-4">
        <div className="hidden md:contents">
          <Filter />
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4 p-2 md:pt-10 md:pr-10">
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

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get("/products/latest-products");
  const { data } = res;

  // Pass data to the page via props
  return { props: { data } };
}
