import React, { useState, useEffect } from "react";
import CartItem from "../components/cart/CartItem";
import PriceDetails from "../components/cart/PriceDetails";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "../utils/axios";
import { toast } from "react-toastify";

function cart() {
  const cart = useSelector((state) => state.cart);
  const { items, totalAmount, totalItems } = cart;
  const router = useRouter();
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartValid, setCartValid] = useState(true);

  useEffect(() => {
    const validateCart = async () => {
      setIsLoading(true);

      await axios.post("/validate-cart/", { items: items }).then((res) => {
        if (res.data.status === false) {
          setCartValid(false);
        }
        setProductData(res.data.product_data);
        console.log(res.data);
      });

      setIsLoading(false);
    };
    validateCart();
  }, []);

  const handleCheckout = async () => {
    if (cartValid) router.push("/checkout");
  };

  const getAvailableQuantity = (productId) => {
    let product = productData.find((product) => product.id === productId);
    return product.quantity;
  };

  return (
    <>
      <Head>
        <title>NFootwear | Cart</title>
      </Head>
      <div className="p-2">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {totalItems > 0 ? (
              <div className="flex flex-col lg:flex-row gap-6 md:p-10">
                <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 lg:flex-[0.6] xl:flex-[0.7]">
                  <div className="border-b-2 border-gray-300 pb-4">
                    <span className="text-xl font-semibold text-gray-500 uppercase">
                      My Cart ({totalItems})
                    </span>
                  </div>
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      availableQuantity={getAvailableQuantity(item.id)}
                      setCartValid={setCartValid}
                    />
                  ))}
                </div>
                {cartValid ? (
                  <div className="lg:fixed lg:right-10 lg:w-[22rem]">
                    <PriceDetails
                      totalAmount={totalAmount}
                      totalItems={totalItems}
                      handleCheckout={handleCheckout}
                      cartValid={cartValid}
                    />
                  </div>
                ) : (
                  <div className="alert alert-error shadow-lg">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Some items in your cart are not available</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <h1 className="text-2xl font-semibold text-center">
                Your cart is empty
              </h1>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default cart;
