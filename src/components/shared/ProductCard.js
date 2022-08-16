import React, { memo } from "react";
import Link from "next/link";
import trimProductName from "../../utils/trimProductName";
import AddToWishlist from "./AddToWishlist";
import { isDesktop } from "react-device-detect";
import { HiStar } from "react-icons/hi";
import Rating from "./Rating";

function ProductCard({ product }) {
  const productLink = `/products/${product.parent_slug}?color=${product.color}`;

  return (
    <div
      className={`productCard cursor-pointer bg-white border-2 border-gray-100 transform ${
        isDesktop && "hover:-translate-y-4"
      } duration-300`}
    >
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
            <div className="w-full h-full"></div>
          </Link>
          <AddToWishlist product={product} />
        </div>
        <Link href={productLink}>
          <div className="w-full h-full"></div>
        </Link>
      </div>
      <Link href={productLink}>
        <a>
          <div className="productDetails mt-4 px-3 pb-2">
            <p>{product.brand.name}</p>
            <h5 className="text-md md:text-lg cursor-pointer font-semibold tracking-tight text-gray-900 dark:text-white hover:text-green-600">
              {trimProductName(product.name)}
            </h5>
            {product.starting_price !== -1 && (
              <h5 className="text-xl md:text-2xl cursor-pointer font-semibold tracking-tight text-red-900 dark:text-white">
                ₹{product.starting_price}
              </h5>
            )}
            <p className="link">{product.available_colors.length} Colors</p>
            <div className="my-2 pb-2">
              {product.rating.rating > 0 ? (
                <div className="flex items-center">
                  <Rating rating={product.rating.rating} />
                  <span className="ml-1 text-slate-400">
                    ({product.rating.review_count})
                  </span>
                </div>
              ) : (
                <p className="text-sm font-bold text-gray-900 flex items-center">
                  <HiStar className="w-6 h-6 text-orange-400" />
                  Not rated yet
                </p>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default memo(ProductCard);
