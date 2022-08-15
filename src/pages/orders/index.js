import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import OrderCard from "../../components/order/OrderCard";

function orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      await axios
        .get("orders/", {
          headers: {
            Authorization: `Token ${JSON.parse(
              localStorage.getItem("nf_auth_token")
            )}`,
          },
        })
        .then((res) => {
          setOrders(res.data);
        });
      setIsLoading(false);
    };
    fetchOrders();
  }, []);
  return (
    <div className="p-4 md:px-10 w-full max-w-6xl mx-auto">
      <h1 className="text-black text-2xl font-semibold">My Orders</h1>
      <div className="divider"></div>
      {isLoading ? (
        "Loading orders..."
      ) : orders.length > 0 ? (
        <div className="flex flex-col gap-2 md:gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1>No orders yet</h1>
        </div>
      )}
    </div>
  );
}

export default orders;
