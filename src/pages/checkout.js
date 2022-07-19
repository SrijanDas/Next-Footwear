import React, { useState } from "react";
import AccountDetails from "../components/checkout/AccountDetails";
import { useSelector, useDispatch } from "react-redux";
import DeliveryDetails from "../components/checkout/DeliveryDetails";
import PaymentDetails from "../components/checkout/PaymentDetails";
import OrderSummary from "../components/checkout/OrderSummary";
import Head from "next/head";
import Script from "next/script";
import axios from "../helpers/axios";
import OrderPlaced from "../components/checkout/OrderPlaced";
import { toast, ToastContainer } from "react-toastify";

function checkout() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [deliveryDetailsFilled, setDeliveryDetailsFilled] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [order, setOrder] = useState({});
  const [transactionDetails, setTransactionDetails] = useState({});

  const confirmOrder = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(loading);
    const body = {
      ...deliveryDetails,
      user: user.id,
      email: user.username,
      items: items,
    };
    const token = await JSON.parse(localStorage.getItem("nf_auth_token"));
    axios
      .post("/orders/checkout/", body, {
        Headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        if (res.data.status) {
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

  const handlePayment = (e) => {
    setLoading(true);

    e.preventDefault();

    const { razorpay_order_id, razorpay_amount, currency, order_details } =
      order;

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
        setTransactionDetails(response.razorpay_payment_id);
        dispatch({
          type: "CLEAR_CART",
        });
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: `${order_details.first_name} ${order_details.last_name}`,
        email: order_details.email,
        contact: order_details.phone,
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
              deliveryDetails={deliveryDetails}
              setDeliveryDetails={setDeliveryDetails}
              deliveryDetailsFilled={deliveryDetailsFilled}
              setDeliveryDetailsFilled={setDeliveryDetailsFilled}
              loading={loading}
            />
            {isAuthenticated && deliveryDetailsFilled && (
              <OrderSummary
                items={items}
                totalAmount={totalAmount}
                totalItems={totalItems}
                confirmOrder={confirmOrder}
                orderConfirmed={orderConfirmed}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {isAuthenticated && deliveryDetailsFilled && orderConfirmed && (
              <PaymentDetails
                orderDetails={order.order_details}
                handlePayment={handlePayment}
                paymentSuccess={paymentSuccess}
                loading={loading}
                transactionDetails={transactionDetails}
              />
            )}
            {isAuthenticated &&
              deliveryDetailsFilled &&
              orderConfirmed &&
              paymentSuccess && (
                <OrderPlaced orderDetails={order.order_details} />
              )}
          </>
        )}
      </div>
      <ToastContainer position="bottom-right" />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}

export default checkout;
