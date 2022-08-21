import React, { useState } from "react";
import Card from "../../components/styled/Card";
import axios from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import OrderItem from "../../components/order/OrderItem";
import Address from "../../components/shared/Address";
import { isMobile } from "react-device-detect";
import { checkReturnPolicy, formatDate } from "../../utils/helpers";
import OrderItemReturnModal from "../../components/order/OrderItemReturnModal";

function Order({ order, error }) {
  if (error) {
    toast.error(error, {
      toastId: "order-error",
    });
    return;
  }

  const order_status = order.order_status;
  const [orderStatus, setorderStatus] = useState(order.order_status);
  const deliveryDate = order.delivery_date;
  const returnPolicy = checkReturnPolicy(order.delivery_date);

  // handle order item return
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const toggleReturnModal = () => setReturnModalOpen(!returnModalOpen);
  const [itemReturned, setItemReturned] = useState([]);
  return (
    <>
      {!error ? (
        <div className="p-2 md:p-10 w-full max-w-4xl mx-auto flex flex-col gap-4">
          <Card title={`Order ID #${order.id}`}>
            <div className="flex flex-col">
              <span className="text-lg font-medium">
                Total Amount: {order.total_amount}
              </span>
              <span className="">Items: {order.items.length}</span>
              <span className="text-black text-lg font-semibold mt-4 flex gap-2 items-center">
                {!isMobile && (
                  <div
                    className={`w-3 h-3 ${
                      order_status === "SHP" ? "bg-green-600" : "bg-warning"
                    } rounded-full`}
                  ></div>
                )}

                {order_status === "SHP"
                  ? `Delivered on ${formatDate(deliveryDate)}`
                  : `Expected Delivery on ${formatDate(deliveryDate)}`}
              </span>
            </div>

            <ul className="steps w-full">
              <li className="step step-primary">
                Order Confirmed
                <br />
                {formatDate(order.created_at)}
              </li>
              <li
                className={`step ${
                  order_status === "DIS" ||
                  (order_status === "SHP" && "step-primary")
                }`}
              >
                Order Dispatched
                <br />
                {order_status === "DIS" ||
                  (order_status === "SHP" && formatDate(order.dispatched_on))}
              </li>
              <li
                className={`step ${order_status === "SHP" && "step-primary"}`}
              >
                Out for Delivery
                <br />
                {order_status === "SHP" && formatDate(order.delivery_date)}
              </li>
              <li
                className={`step ${order_status === "SHP" && "step-primary"}`}
              >
                Delivered
                <br />
                {order_status === "SHP" && formatDate(order.delivery_date)}
              </li>
            </ul>
          </Card>
          <Card title="Items">
            {order.items.map((item, index) => (
              <div key={item.id}>
                <div className="mt-4 cursor-pointer">
                  <OrderItem
                    item={item}
                    delivery_date={deliveryDate}
                    order_status={
                      itemReturned.includes(item.id) || item.returned
                        ? "RET"
                        : orderStatus
                    }
                    redirectLink={`/products/${item.product.slug}?color=${item.product.color.slug}&size=${item.product.size}`}
                  />
                  {order_status === "SHP" && (
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-gray-500">
                        <span className="text-gray-500">
                          {itemReturned.includes(item.id) || item.returned ? (
                            "Item Returned"
                          ) : (
                            <>
                              {!returnPolicy.expired
                                ? "Return Policy Expires on "
                                : "Return Policy Expired on "}

                              {formatDate(returnPolicy.date)}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="btn-group">
                        {!returnPolicy.expired && !item.returned && (
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => toggleReturnModal()}
                          >
                            Return Item
                          </button>
                        )}
                        <button className="btn btn-sm btn-ghost">
                          Need Help?
                        </button>
                      </div>
                    </div>
                  )}

                  {index !== order.items.length - 1 && (
                    <div className="divider"></div>
                  )}
                </div>
                <OrderItemReturnModal
                  isOpen={returnModalOpen}
                  onClose={toggleReturnModal}
                  itemId={item.id}
                  setItemReturned={setItemReturned}
                />
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
