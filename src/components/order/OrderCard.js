import React from "react";
import Link from "next/link";
import {
  HiTruck,
  HiOutlineInformationCircle,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";

import OrderItem from "./OrderItem";
import { formatPrice } from "../../utils/helpers";

const orderStatus = {
  YTD: {
    text: "Yet to Dispatch",
    color: "info",
    icon: <HiOutlineInformationCircle />,
  },
  DIS: { text: "Dispatched", color: "blue-600", icon: <HiTruck /> },
  SHP: { text: "Shipped", color: "green-500", icon: <HiCheckCircle /> },
  CAN: { text: "Cancelled", color: "red-500", icon: <HiXCircle /> },
};

function OrderCard({ order }) {
  const { items, order_status, delivery_date } = order;
  return (
    <div className="rounded-lg bg-base-100 shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-all duration-300">
      {items.map((item, index) => (
        <div key={item.id}>
          <OrderItem
            item={item}
            order_status={order_status}
            delivery_date={delivery_date}
            redirectLink={`orders/${order.id}`}
          />
          {index !== items.length - 1 && <div className="divider"></div>}
        </div>
      ))}
      <div></div>
    </div>
  );
}

export default OrderCard;
