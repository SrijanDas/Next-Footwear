import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../store/actions/authActions";
import { load_cart } from "../store/actions/cartActions";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";

function Layout({ title, content, children }) {
  const isLoading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(load_user());
      dispatch(load_cart());
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col h-screen justify-between">
          <Header isAuthenticated={isAuthenticated} cart={cart} />
          {children}
          <Footer />
        </div>
      )}
    </>
  );
}

Layout.defaultProps = {
  title: "NFootwear",
  content: "We ship footwares directly from the brands to your doorsteps...",
};

export default Layout;
