import React from "react";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  return (
    <div className="flex flex-col max-w-sm h-[25rem] bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link href="/products">
        <div className="p-1 rounded-t-lg cursor-pointer flex flex-col items-center">
          <Image
            src={product.img}
            className="w-full object-contain"
            width={200}
            height={200}
          />
        </div>
      </Link>
      <div className="px-5 pb-5 flex-1 flex flex-col justify-between">
        <Link href="/products">
          <h5 className="text-xl cursor-pointer font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name.length > 50
              ? product.name.slice(0, 50) + "..."
              : product.name}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-4">
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              4.95
            </p>
            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <a
              href="#"
              class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              73 reviews
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{product.price}
          </span>
          <Link href="/cart">
            <button className="btn-green mt-2 md:mt-0">Add to cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
