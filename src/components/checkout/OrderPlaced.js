import Link from "next/link";
import React from "react";
import { HiCheck } from "react-icons/hi";

function OrderPlaced({ orderDetails }) {
  return (
    <div className="alert shadow-lg">
      <div>
        <HiCheck className="h-6 w-6" />
        <div>
          <h3 className="font-bold">Your Order has been confirmed!</h3>
          <div className="text-xs">Order id: {orderDetails.id}</div>
        </div>
      </div>
      <div className="flex-none">
        <Link href={`account/orders/${orderDetails.id}`}>
          <button className="btn btn-sm btn-primary">Track Order</button>
        </Link>
      </div>
    </div>
  );
}

export default OrderPlaced;
