import React from "react";
import ProductCard from "../../components/shared/ProductCard";
import axios from "../../helpers/axios";
import Head from "next/head";
import Filter from "../../components/filters/Filter";
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

      <div className="md:p-20">
        <Filter />

        <div className="h-screen md:mt-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
