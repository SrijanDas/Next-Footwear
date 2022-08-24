import React, { useState } from "react";
import { trimProductName, formatDate, formatPrice } from "../../utils/helpers";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import { HiStar } from "react-icons/hi";
import ReviewModal from "./ReviewModal";
import axios from "../../utils/axios";
import { useRouter } from "next/router";

function OrderItem({
  item,
  order_status,
  delivery_date = "",
  redirectLink = "/",
}) {
  const router = useRouter();
  const orderStatus = item.returned
    ? "RET"
    : item.return_requested
    ? "RET_REQUESTED"
    : order_status;
  // handle review
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const toggleReviewModal = () => setReviewModalOpen(!reviewModalOpen);
  const [orderItemReview, setOrderItemReview] = useState(item.review);

  const submitReview = async (rating, review) => {
    const body = {
      order_item: item.id,
      product: item.product.id,
      rating: rating + 1,
      review,
    };

    const headers = {
      Authorization: `Token ${JSON.parse(
        localStorage.getItem("nf_auth_token")
      )}`,
    };

    await axios.post("/review", body, { headers }).then((res) => {
      setOrderItemReview(res.data);
    });

    toggleReviewModal();
  };

  const handleClick = (e) => {
    if (e.target.id === "review-btn") {
      toggleReviewModal();
    } else {
      router.push(redirectLink);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex gap-4 items-start md:justify-around"
      >
        <div className="avatar">
          <div className="w-24 rounded-lg relative cursor-pointer">
            <Image
              alt="product"
              src={item.product.image_url}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-around md:w-3/4">
          <div className="hidden md:flex flex-col">
            <span className="font-medium">
              {trimProductName(item.product.name, 20)}
            </span>
            <span className="mr-2 text-gray-400 antialiased">
              Color: {item.product.color.name} | Size: {item.product.size}
              <br />
              Qty: {item.quantity}
            </span>
            <span className="text-lg font-semibold">
              {formatPrice(item.price)}
            </span>
          </div>
          <div className="flex flex-col md:w-[50%]">
            {delivery_date !== "" && (
              <div className="flex flex-col">
                <span className="text-black text-lg font-medium flex gap-2 items-center">
                  {!isMobile && (
                    <div
                      className={`w-3 h-3 ${
                        orderStatus === "SHP"
                          ? "bg-green-600"
                          : orderStatus === "RET" ||
                            orderStatus === "RET_REQUESTED"
                          ? "bg-error"
                          : "bg-warning"
                      } rounded-full`}
                    ></div>
                  )}

                  {orderStatus === "SHP"
                    ? `Delivered on ${formatDate(delivery_date)}`
                    : orderStatus === "RET"
                    ? "Returned"
                    : orderStatus === "RET_REQUESTED"
                    ? "Return Requested"
                    : `Expected Delivery on ${formatDate(delivery_date)}`}
                </span>
                <span className="">
                  {trimProductName(item.product.name, 20)}
                  <br />
                  {orderStatus === "SHP"
                    ? "Your item has been delivered"
                    : orderStatus === "RET"
                    ? "Your returned this Item"
                    : orderStatus === "RET_REQUESTED"
                    ? "Pending return"
                    : "Your item is yet to deliver"}
                </span>
                {orderStatus === "SHP" &&
                  (!orderItemReview ? (
                    <span
                      // onClick={toggleReviewModal}
                      id="review-btn"
                      className="text-indigo-600 mt-2 text-lg font-semibold flex gap-2 items-center"
                    >
                      <HiStar /> Rate and Review
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <HiStar
                          key={i}
                          className={`w-6 h-6 ${
                            i >= orderItemReview.rating
                              ? "text-green-200"
                              : "text-green-600"
                          } `}
                        />
                      ))}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ReviewModal
        submitReview={submitReview}
        isOpen={reviewModalOpen}
        onClose={toggleReviewModal}
      />
    </>
  );
}

export default OrderItem;
