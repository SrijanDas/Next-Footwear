import React from "react";
import trimProductName from "../../utils/trimProductName";
import { isMobile } from "react-device-detect";
import formatDate from "../../utils/formatDate";
import Image from "next/image";
import { HiStar } from "react-icons/hi";
function OrderItem({ item, order_status, delivery_date = "" }) {
  return (
    <div className="flex flex-col md:flex-row md:justify-around gap-4">
      <div className="flex gap-4">
        <div className="avatar">
          <div className="w-24 rounded-lg">
            <Image
              alt="image"
              src={item.product.image_url}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        {delivery_date !== "" && (
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
            <span className="">
              {trimProductName(item.product.name, 20)}
              <br />
              {order_status === "SHP"
                ? "Your item has been delivered"
                : "Your item is yet to deliver"}
            </span>
            {order_status === "SHP" && (
              <span className="text-indigo-600 mt-2 text-lg font-semibold flex gap-2 items-center">
                <HiStar /> Rate and Review
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h5 className="text-black text-lg font-semibold">
          {trimProductName(item.product.name, 20)}
        </h5>
        <span className="mr-2">Color: {item.product.color}</span>
        <span>Size: {item.product.size}</span>
      </div>
    </div>
  );
}

export default OrderItem;
