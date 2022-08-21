import React from "react";
import { trimProductName } from "../../utils/helpers";

function ProductTitle({ title = "", charLimit = 40 }) {
  return (
    <h5 className="text-md md:text-lg cursor-pointer font-semibold tracking-tight text-gray-900 dark:text-white hover:text-green-600">
      {trimProductName(title, charLimit)}
    </h5>
  );
}

export default ProductTitle;
