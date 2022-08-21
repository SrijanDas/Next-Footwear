import React from "react";
import { formatPrice } from "../../utils/helpers";
function ProductPrice({ price, currency = "INR" }) {
  return (
    <>
      {price > 0 && (
        <h5 className="text-xl md:text-2xl cursor-pointer font-semibold tracking-tight text-red-900 dark:text-white">
          {formatPrice(price, currency)}
        </h5>
      )}
    </>
  );
}

export default ProductPrice;
