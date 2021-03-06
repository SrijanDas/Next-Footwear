import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import trimProductName from "../utils/trimProductName";

function ProductCard({ product }) {
  const productLink = `/products/${product.slug}`;

  return (
    <div className="flex sm:flex-col gap-2 sm:gap-4 rounded-lg shadow-md p-4 border-2 border-gray-100">
      <Link href={productLink}>
        <a className="rounded-lg w-40 h-30 sm:w-full">
          <Image
            alt="image"
            src={product.image_url}
            className="rounded-lg"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="cover"
          />
        </a>
      </Link>

      <div className="">
        <Link href={productLink}>
          <h5 className="text-lg cursor-pointer font-semibold tracking-tight text-gray-900 dark:text-white hover:text-green-600">
            {trimProductName(product.name)}
          </h5>
        </Link>
        <Link href={productLink}>
          <h5 className="text-2xl cursor-pointer font-semibold tracking-tight text-red-900 dark:text-white">
            {product.starting_price != -1 && `₹ ${product.starting_price}`}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-4">
          <div className="flex flex-wrap gap-1 items-center">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <p className="ml text-sm font-bold text-gray-900 dark:text-white">
              {product.rating ? product.rating : "Not rated yet"}
            </p>
            <span className="w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <Link href={productLink}>
              <div className="text-sm font-medium text-gray-900 underline hover:no-underline cursor-pointer dark:text-white">
                {product.review_count ? product.review_count : "0"} reviews
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
