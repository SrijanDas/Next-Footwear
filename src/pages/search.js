import React from "react";
import { useEffect } from "react";
import ProductCard from "../components/shared/ProductCard";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Filter from "../components/filters/Filter";

function search({ products }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "SEARCH_END",
    });
  }, [dispatch, router.asPath]);

  return (
    <div className="md:p-20">
      <Filter />

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
