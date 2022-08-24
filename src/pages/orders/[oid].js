import React, { useState } from "react";
import Card from "../../components/styled/Card";
import axios from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import OrderItem from "../../components/order/OrderItem";
import Address from "../../components/shared/Address";
import { checkReturnPolicy, formatDate } from "../../utils/helpers";
import OrderItemReturnModal from "../../components/order/OrderItemReturnModal";
import DeliveryTimeline from "../../components/order/DeliveryTimeline";

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
  const cancelReturn = async (itemId) => {
    // setItemReturned((prev) => prev.filter((id) => id !== itemId));
    await axios.post("cancel-return/", { itemId });
    window.location.reload();
  };

  return (
    <>
      {!error ? (
        <div className="p-2 md:p-10 w-full max-w-4xl mx-auto flex flex-col gap-4">
          <DeliveryTimeline order={order} />
          <Card title="Items">
            {order.items.map((item, index) => (
              <div key={item.id}>
                <div className="mt-4 cursor-pointer">
                  <OrderItem
                    item={item}
                    delivery_date={deliveryDate}
                    order_status={
                      item.returned
                        ? "RET"
                        : itemReturned.includes(item.id) ||
                          item.return_requested
                        ? "RET_REQUESTED"
                        : orderStatus
                    }
                    redirectLink={`/products/${item.product.slug}?color=${item.product.color.slug}&size=${item.product.size}`}
                  />
                  {order_status === "SHP" && (
                    <div className="md:flex md:justify-between md:items-center mt-4">
                      <div className="text-gray-500">
                        <span className="text-gray-500">
                          {itemReturned.includes(item.id) ||
                          item.return_requested ? (
                            "Returned Requested"
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
                      <div className="divider my-1 md:hidden"></div>
                      <div className="md:mt-0 btn-group justify-center">
                        {item.return_requested ||
                        itemReturned.includes(item.id) ? (
                          <button
                            onClick={() => cancelReturn(item.id)}
                            className="btn btn-sm btn-ghost w-1/2 md:w-auto"
                          >
                            Cancel Return
                          </button>
                        ) : (
                          ""
                        )}
                        {!returnPolicy.expired &&
                          !item.returned &&
                          !item.return_requested &&
                          !itemReturned.includes(item.id) && (
                            <button
                              className="btn btn-sm btn-ghost w-1/2 md:w-auto"
                              onClick={() => toggleReturnModal()}
                            >
                              Return Item
                            </button>
                          )}
                        <button className="btn btn-sm btn-ghost w-1/2 md:w-auto">
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
