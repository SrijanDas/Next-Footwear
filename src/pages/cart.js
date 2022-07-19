import React from "react";
import CartItem from "../components/cart/CartItem";
import PriceDetails from "../components/cart/PriceDetails";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

function cart() {
  const cart = useSelector((state) => state.cart);
  const { items, totalAmount, totalItems } = cart;
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <>
      <Head>
        <title>NFootwear | Cart</title>
      </Head>
      <div className="p-2">
        {totalItems > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6 md:p-10">
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 lg:flex-[0.6] xl:flex-[0.7]">
              <div className="border-b-2 border-gray-300 pb-4">
                <span className="text-xl font-semibold text-gray-500 uppercase">
                  My Cart ({totalItems})
                </span>
              </div>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="lg:fixed lg:right-10 lg:w-[22rem]">
              <PriceDetails
                totalAmount={totalAmount}
                totalItems={totalItems}
                handleCheckout={handleCheckout}
              />
            </div>
          </div>
        ) : (
          <h1 className="text-2xl font-semibold text-center">
            Your cart is empty
          </h1>
        )}
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default cart;
