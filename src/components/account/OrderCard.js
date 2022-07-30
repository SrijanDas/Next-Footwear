import Image from "next/image";
import React, { memo } from "react";
import ProductImage from "../../assets/addidas1.png";
import { HiStar } from "react-icons/hi";
import Link from "next/link";

function OrderCard({ order }) {
  console.log(order);
  return (
    <Link href={`orders/${order.id}`}>
      <div className="my-2 cursor-pointer card card-side bg-base-100 shadow-md hover:shadow-lg border border-gray-200 p-4 flex justify-around gap-2 flex-wrap">
        <div className="rounded-lg h-30 w-40 mt-0">
          <Image
            alt="image"
            src={ProductImage}
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        <div>
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
        </div>
      </div>
    </Link>
  );
}

export default memo(OrderCard);
