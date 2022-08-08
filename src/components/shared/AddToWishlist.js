import React, { useState } from "react";
import { HiHeart } from "react-icons/hi";
import { toast } from "react-toastify";

function AddToWishlist({ product = null }) {
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  const addToWishlist = () => {
    if (product === null) {
      return;
    }

    if (!addedToWishlist) {
      setAddedToWishlist(true);
      toast.success(`"${product.name}" added to wishlist`);
    } else {
      setAddedToWishlist(false);
      toast.warning(`"${product.name}" removed from wishlist`);
    }
  };
  return (
    <button
      onClick={addToWishlist}
      className="bg-white rounded-full p-1 shadow-md top-0 right-0 relative cursor-pointer hover:shadow-lg border-2 border-slate-100"
    >
      <HiHeart
        className={`h-6 w-6 ${
          addedToWishlist ? "text-red-500" : "text-slate-300"
        }`}
      />
    </button>
  );
}

export default AddToWishlist;
