import React, { useState } from "react";
import AccountDetails from "../components/checkout/AccountDetails";
import { useSelector, useDispatch } from "react-redux";
import DeliveryDetails from "../components/checkout/DeliveryDetails";
import PaymentDetails from "../components/checkout/PaymentDetails";
import OrderSummary from "../components/checkout/OrderSummary";
import Head from "next/head";
import Script from "next/script";
import axios from "../utils/axios";
import OrderPlaced from "../components/checkout/OrderPlaced";
import { toast } from "react-toastify";
import Link from "next/link";

function checkout() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    landmark: "",
  });

  const [deliveryDetailsFilled, setDeliveryDetailsFilled] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [order, setOrder] = useState({});

  if (typeof window !== undefined && items.length <= 0 && !paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        No items in cart
        <Link href={"/products"}>
          <a className="btn">Continue Shopping</a>
        </Link>
      </div>
    );
  }

  const createOrder = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      user: user.id,
      items: items,
      address: deliveryDetails.id,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${JSON.parse(
        localStorage.getItem("nf_auth_token")
      )}`,
    };

    await axios
      .post("/orders/checkout/", data, { headers })
      .then((res) => {
        if (res.data) {
          setOrderConfirmed(true);
          setOrder(res.data);
        } else {
          setOrderConfirmed(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // *
  // * Payment
  // *

  const handlePayment = async (e, paymentMethod) => {
    setLoading(true);
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${JSON.parse(
        localStorage.getItem("nf_auth_token")
      )}`,
    };
    const res = await axios.post(
      "orders/place-order/",
      {
        order_id: order.id,
        paymentMethod,
      },
      { headers }
    );

    if (res.status) {
      if (paymentMethod === "cod") {
        console.log("cod placing order");
        setPaymentSuccess(true);
        setLoading(false);
        dispatch({
          type: "CLEAR_CART",
        });
      } else if (paymentMethod === "online") {
        const { razorpay_order_id, razorpay_amount, currency } =
          res.data.razorpay_details;

        const options = {
          key: process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
          amount: razorpay_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: currency,
          name: "Next Footwear",
          description: "Transaction",
          image:
            "https://firebasestorage.googleapis.com/v0/b/nshoes-ca1c5.appspot.com/o/website_logo.png?alt=media&token=633636d2-58cd-4101-afc7-c79a5152ebdf",
          order_id: razorpay_order_id,
          handler: (response) => {
            setPaymentSuccess(true);
            setLoading(false);
            setOrder({ ...order, transactionId: response.razorpay_payment_id });
            dispatch({
              type: "CLEAR_CART",
            });
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
          },
          prefill: {
            name: deliveryDetails.name,
            email: user.email,
            contact: deliveryDetails.phone,
          },
          notes: {
            address: "NextFootwear Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function () {
              console.log("Checkout form closed");
              setLoading(false);
              setPaymentSuccess(false);
            },
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", (response) => {
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          toast.error("Payment Failed");

          setLoading(false);
          setPaymentSuccess(false);
        });

        rzp1.open();
      }

      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>NFootwear | Checkout</title>
      </Head>
      <div className="p-4 flex flex-col gap-2 w-full md:p-10 md:w-[60%] max-w-5xl mx-auto">
        <AccountDetails user={user} isAuthenticated={isAuthenticated} />
        {isAuthenticated && (
          <>
            <DeliveryDetails
              deliveryAddress={deliveryDetails}
              setDeliveryAddress={setDeliveryDetails}
              deliveryDetailsFilled={deliveryDetailsFilled}
              setDeliveryDetailsFilled={setDeliveryDetailsFilled}
              loading={loading}
            />
            {isAuthenticated && deliveryDetailsFilled && (
              <OrderSummary
                items={items}
                totalAmount={totalAmount}
                totalItems={totalItems}
                confirmOrder={createOrder}
                orderConfirmed={orderConfirmed}
                setOrderConfirmed={setOrderConfirmed}
                loading={loading}
                setLoading={setLoading}
                order={order}
              />
            )}
            {isAuthenticated && deliveryDetailsFilled && orderConfirmed && (
              <PaymentDetails
                orderDetails={order}
                handlePayment={handlePayment}
                paymentSuccess={paymentSuccess}
                loading={loading}
              />
            )}
            {isAuthenticated &&
              deliveryDetailsFilled &&
              orderConfirmed &&
              paymentSuccess && <OrderPlaced orderDetails={order} />}
          </>
        )}
      </div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}

export default checkout;
