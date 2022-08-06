import React from "react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
function search({ products }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "SEARCH_END",
    });
  }, [dispatch, router.asPath]);

  return (
    <div>
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
