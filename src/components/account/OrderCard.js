import React, { memo } from "react";
import Link from "next/link";
import {
  HiTruck,
  HiOutlineInformationCircle,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";

import OrderItem from "./OrderItem";

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
  const { items, order_status, delivery_date, total_amount } = order;

  return (
    <Link href={`/account/orders/${order.id}`}>
      <div className="my-4 cursor-pointer rounded-lg bg-base-100 shadow-md hover:shadow-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <h5 className="text-black text-lg font-semibold">{`Order ID #${order.id}`}</h5>
          <span className="text-black text-lg font-semibold">
            Amount: ₹{Number(total_amount)}
          </span>
          <span
            className={`text-${orderStatus[order_status].color} text-lg font-semibold flex gap-1 items-center`}
          >
            {orderStatus[order_status].icon}
            {orderStatus[order_status].text}
          </span>
        </div>
        {items.map((item) => (
          <OrderItem
            key={item.id}
            item={item}
            order_status={order_status}
            delivery_date={delivery_date}
          />
        ))}
      </div>
    </Link>
  );
}

export default memo(OrderCard);
