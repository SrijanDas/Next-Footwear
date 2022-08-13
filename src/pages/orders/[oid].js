import React from "react";
import Card from "../../components/styled/Card";
import axios from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import OrderItem from "../../components/order/OrderItem";
import Address from "../../components/shared/Address";
import { isMobile } from "react-device-detect";
import formatDate from "../../utils/formatDate";

function Order({ order, error }) {
  if (error) {
    toast.error(error, {
      toastId: "order-error",
    });
    return;
  }

  const order_status = order.order_status;
  const delivery_date = order.delivery_date;
  const orderDelivered = order_status === "SHP";

  return (
    <>
      {!error ? (
        <div className="p-2 md:p-10 w-full max-w-4xl mx-auto flex flex-col gap-4">
          <Card title={`Order ID #${order.id}`}>
            <div className="flex flex-col">
              <span className="text-black text-lg font-semibold flex gap-2 items-center">
                {!isMobile && (
                  <div
                    className={`w-3 h-3 ${
                      order_status === "SHP" ? "bg-green-600" : "bg-warning"
                    } rounded-full`}
                  ></div>
                )}

                {order_status === "SHP"
                  ? `Delivered on ${formatDate(delivery_date)}`
                  : `Expected Delivery on ${formatDate(delivery_date)}`}
              </span>
            </div>
            <ul className="steps">
              <li className="step step-primary">Order Confirmed</li>
              <li className={`step ${orderDelivered && "step-primary"}`}>
                Order Dispatched
              </li>
              <li className={`step ${orderDelivered && "step-primary"}`}>
                Out for Delivery
              </li>
              <li className={`step ${orderDelivered && "step-primary"}`}>
                Delivered
              </li>
            </ul>
          </Card>
          <Card title="Items">
            {order.items.map((item, index) => (
              <div key={item.id} className="mt-4">
                <OrderItem item={item} />

                {index !== order.items.length - 1 && (
                  <div className="divider"></div>
                )}
              </div>
            ))}
          </Card>
          <Card title={"Delivery Address"}>
            <Address address={order.address} showEditBtn={false} />
          </Card>
        </div>
      ) : (
        <Card title="Order not found"></Card>
      )}
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default Order;

// This gets called on every request
export async function getServerSideProps(req, res) {
  // Fetch data from external API
  const orderId = req.query.oid;
  try {
    const res = await axios.get(`/orders/${orderId}`);
    const order = res.data;
    return { props: { order, error: null } };
  } catch (error) {
    return { props: { order: {}, error: error.response.data[0] } };
  }
}
