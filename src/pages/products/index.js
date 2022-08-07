import React from "react";
import ProductCard from "../../components/ProductCard";
import axios from "../../helpers/axios";
import Head from "next/head";
import { MobileFilter, DesktopFilter } from "../../components/products/Filters";
import { isMobile } from "react-device-detect";

function Products({ products }) {
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

      <div className="productsPag flex flex-col items-center md:flex-row md:gap-4 md:items-start pb-10">
        {isMobile ? (
          <div className="mb-2 w-full shadow-md">
            <MobileFilter />
          </div>
        ) : (
          <DesktopFilter />
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:p-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
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
