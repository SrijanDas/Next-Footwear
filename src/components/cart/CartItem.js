import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiPlus, HiMinus, HiHeart, HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isBrowser, isMobile } from "react-device-detect";

function CartItem({ item }) {
  const dispatch = useDispatch();
  // const memoizedValue = useMemo(() => computeItemTotal(item.price, item.quantity), [item.price, item.quantity]);

  const [quantity, setQuantity] = React.useState(item.quantity);
  const handleQtyChange = (e) => {
    const value = String(e.target.value);
    if (value.length > 1) {
      let newValue = value[0];
      setQuantity(Number(newValue));
    } else {
      setQuantity(value);
    }
    console.log("quantity", quantity);
  };

  const decrementQty = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
      dispatch({
        type: "DECREMENT_QUANTITY",
        payload: {
          itemId2: item.id,
          price: item.price,
        },
      });
      toast.success(
        `You've changed '${item.name}' QUANTITY to '${item.quantity}'`
      );
    } else {
      toast.warn("Item quantity should not be less than 1");
      setQuantity(1);
    }
  };

  const incrementQty = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      dispatch({
        type: "INCREMENT_QUANTITY",
        payload: {
          itemId: item.id,
          price: item.price,
        },
      });
      toast.success(
        `You've changed '${item.name}' QUANTITY to '${item.quantity}'`
      );
    } else {
      toast.warn("We're sorry! Only 10 unit(s) allowed for each item");
      setQuantity(10);
    }
  };

  const saveToWishlist = () => {
    toast.success("Item added to wishlist");
  };

  const removeItem = () => {
    dispatch({
      type: "REMOVED_FROM_CART",
      payload: {
        id: item.id,
        price: item.price * item.quantity,
      },
    });
    toast.warning(`You've removed '${item.name}' from cart`);
  };

  return (
    <div className="border-t-2 border-gray-300 py-4 flex flex-col gap-2 sm:gap-4">
      <div className="flex md:gap-6">
        <div className="flex flex-col items-center">
          {/* <Link href={`/products/${item.slug}`}> */}
          <a className="rounded-xl w-40 h-30">
            <Image
              alt="image"
              src={item.imageUrl}
              className="rounded-xl"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
            />
          </a>
          {/* </Link> */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={decrementQty}
              className="btn btn-sm btn-circle btn-outline"
            >
              <HiMinus />
            </button>
            <input
              className="input input-bordered w-14 text-center font-semibold text-lg"
              type="number"
              value={quantity}
              onChange={handleQtyChange}
            />
            <button
              className="btn btn-sm btn-circle btn-outline"
              onClick={incrementQty}
            >
              <HiPlus />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="ml-4">
            <h5 className="text-black text-lg font-semibold">{item.name}</h5>
            <span className="mr-2">
              Color: {item.color} | Size: {item.size}
            </span>
            <br />
            <span>Delivery by Fri Jul 22</span>
            <br />
            <span className="text-black text-3xl font-semibold">
              ₹{item.price * item.quantity}
            </span>
          </div>
          {isBrowser && (
            <div className="flex items-center ml-4 mt-6 gap-2">
              <button
                className="btn btn-xs btn-ghost gap-2"
                onClick={saveToWishlist}
              >
                Save for later
                <HiHeart />
              </button>
              <button
                className="btn btn-xs btn-ghost gap-2"
                onClick={removeItem}
              >
                <HiOutlineTrash />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
      {isMobile && (
        <div className="card-btns flex items-center">
          <button
            className="btn btn-ghost gap-2 w-1/2"
            onClick={saveToWishlist}
          >
            Save for later
            <HiHeart />
          </button>
          <button className="btn btn-ghost gap-2 w-1/2" onClick={removeItem}>
            <HiOutlineTrash />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default CartItem;
