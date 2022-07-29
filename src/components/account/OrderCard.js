import Image from "next/image";
import React from "react";
import ProductImage from "../../assets/addidas1.png";
import { HiStar } from "react-icons/hi";

function OrderCard({ order }) {
  const { id, items } = order;
  return (
    <div className="my-2 cursor-pointer card card-side bg-base-100 shadow-md hover:shadow-lg border border-gray-200 p-4 flex flex-col justify-around gap-2 md:flex-row ">
      {/* <div className="rounded-lg w-30 h-30 md:w-40 md:mt-0">
        <Image
          alt="image"
          src={ProductImage}
          objectFit="cover"
          className="rounded-xl"
        />
      </div> */}
      <div>
        <h5 className="text-black text-lg font-semibold">Order ID #{id}</h5>
        <span className="mr-2">Total Items: {items.length}</span> <br />
        <span className="mr-2">
          Amount: {Number(order.sub_total) + Number(order.packaging_fees)}
        </span>{" "}
        <br />
        <span className="mr-2">Order Status: {order.order_status}</span>
      </div>
      {/* <div>
        <h5 className="text-black text-lg font-semibold">Addidas</h5>
        <span className="mr-2">Color: Blue</span>
        <span>Size: 7</span>
      </div>
      <div>
        <span className="text-black text-lg font-semibold">$100</span>
      </div>
      <div className="flex flex-col">
        <span className="text-black text-lg font-semibold flex gap-2 items-center">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          Delivered on June 22
        </span>
        <span>Your item has been delivered</span>
        <span className="text-indigo-600 mt-2 text-lg font-semibold flex gap-2 items-center">
          <HiStar /> Rate and Review
        </span>
      </div>*/}
    </div>
  );
}

export default OrderCard;
