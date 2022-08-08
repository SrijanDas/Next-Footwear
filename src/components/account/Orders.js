import React, { useState, memo } from "react";
import Card from "../styled/Card";
import OrderCard from "./OrderCard";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

function Orders({ orders }) {
  const [showAllOrders, setShowAllOrders] = useState(false);
  const toggleShowAllOrders = () => setShowAllOrders(!showAllOrders);
  return (
    <Card title="My Orders">
      {orders.length > 0 ? (
        <div
          className={`collapse collapse-arrow ${
            showAllOrders ? "collapse-open" : "collapse-close"
          }`}
        >
          <div className="flex justify-between items-center">
            <h1>{`${orders.length} Orders`}</h1>
            <button
              onClick={toggleShowAllOrders}
              className="btn btn-outline btn-primary gap-2"
            >
              View All Orders
              <label className="swap">
                <input type="checkbox" checked={showAllOrders} />
                <HiChevronUp className="h-5 w-5 swap-on" />
                <HiChevronDown className="h-5 w-5 swap-off" />
              </label>
            </button>
          </div>
          <div className="collapse-content mt-4 p-0">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1>No orders yet</h1>
        </div>
      )}
    </Card>
  );
}

export default memo(Orders);
