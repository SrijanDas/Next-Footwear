import React from "react";
import Card from "../styled/Card";
import { isMobile } from "react-device-detect";
import { formatDate } from "../../utils/helpers";

function DeliveryTimeline({ order }) {
  const order_status = order.order_status;

  return (
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
            ? `Delivered on ${formatDate(order.delivery_date)}`
            : `Expected Delivery on ${formatDate(order.delivery_date)}`}
        </span>
      </div>

      <ul className="steps steps-vertical md:steps-horizontal w-full">
        <li className="step step-primary">
          Order Confirmed
          <br />
          {formatDate(order.created_at)}
        </li>
        <li
          className={`step ${
            order_status === "DIS" || (order_status === "SHP" && "step-primary")
          }`}
        >
          Order Dispatched
          <br />
          {order_status === "DIS" ||
            (order_status === "SHP" && formatDate(order.dispatched_on))}
        </li>
        <li className={`step ${order_status === "SHP" && "step-primary"}`}>
          Out for Delivery
          <br />
          {order_status === "SHP" && formatDate(order.delivery_date)}
        </li>
        <li className={`step ${order_status === "SHP" && "step-primary"}`}>
          Delivered
          <br />
          {order_status === "SHP" && formatDate(order.delivery_date)}
        </li>
      </ul>
    </Card>
  );
}

export default DeliveryTimeline;
