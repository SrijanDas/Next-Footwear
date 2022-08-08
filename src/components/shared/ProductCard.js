import React, { memo } from "react";
import Link from "next/link";
import trimProductName from "../../utils/trimProductName";
import AddToWishlist from "./AddToWishlist";

function ProductCard({ product }) {
  const productLink = `/products/${product.slug}`;

  return (
    <div className="productCard bg-white border-2 border-gray-100 transform hover:-translate-y-4 duration-300">
      <div
        className="h-48 w-full bg-gray-200 flex flex-col justify-between p-2 bg-cover bg-center"
        style={{
          backgroundImage: ` url(
              ${product.image_url}
            )`,
        }}
      >
        <div className="flex justify-end">
          <Link href={productLink}>
            <a className="w-full h-full"></a>
          </Link>
          <AddToWishlist product={product} />
        </div>
        <Link href={productLink}>
          <a className="w-full h-full"></a>
        </Link>
      </div>

      <div className="productDetails mt-4 px-3">
        <p>{product.brand.name}</p>
        <Link href={productLink}>
          <h5 className="text-md md:text-lg cursor-pointer font-semibold tracking-tight text-gray-900 dark:text-white hover:text-green-600">
            {trimProductName(product.name)}
          </h5>
        </Link>
        {product.starting_price !== -1 && (
          <Link href={productLink}>
            <h5 className="text-xl md:text-2xl cursor-pointer font-semibold tracking-tight text-red-900 dark:text-white">
              ₹{product.starting_price}
            </h5>
          </Link>
        )}
        <Link href={productLink}>
          <p className="link">{product.available_colors.length} Colors</p>
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

            {product.review_count && (
              <>
                <span className="w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <Link href={productLink}>
                  <div className="text-sm font-medium text-gray-900 underline hover:no-underline cursor-pointer dark:text-white">
                    {product.review_count}{" "}
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
