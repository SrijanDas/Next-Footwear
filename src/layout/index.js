import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../store/actions/authActions";
import { load_cart } from "../store/actions/cartActions";
import Drawer from "./Drawer";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "../components/Loader";
import NextNProgress from "nextjs-progressbar";
import LoginModal from "./LoginModal";

function Layout({ title, content, children }) {
  const isLoading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { totalItems } = useSelector((state) => state.cart);

  // drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("login-modal-btn").click();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

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
        <>
          <Drawer
            isAuthenticated={isAuthenticated}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
          {drawerOpen && (
            <div
              onClick={() => setDrawerOpen(false)}
              className={`w-full h-full bg-gray-500/30 z-40 fixed`}
            ></div>
          )}
          <div
            className={`flex flex-col h-screen justify-between ease-in duration-200`}
          >
            <NextNProgress height={4} />
            <Header
              isAuthenticated={isAuthenticated}
              totalItems={totalItems}
              toggleDrawer={toggleDrawer}
            />

            {children}
            <Footer />
          </div>
          <LoginModal />
        </>
      )}
    </>
  );
}

Layout.defaultProps = {
  title: "NFootwear",
  content: "We ship footwares directly from the brands to your doorsteps...",
};

export default Layout;
