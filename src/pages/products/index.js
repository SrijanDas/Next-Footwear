import React from "react";
import ProductCard from "../../components/ProductCard";
import axios from "../../helpers/axios";
import Head from "next/head";
import { MobileFilter, DesktopFilter } from "../../components/products/Filters";

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

      <div className="productsPage flex flex-col items-center md:flex-row gap-4 md:items-start">
        <MobileFilter />
        <DesktopFilter />
        <div className="p-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-10">
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
