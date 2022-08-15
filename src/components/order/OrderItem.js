import React, { useState } from "react";
import trimProductName from "../../utils/trimProductName";
import { isMobile } from "react-device-detect";
import formatDate from "../../utils/formatDate";
import Image from "next/image";
import { HiStar } from "react-icons/hi";
import ReviewModal from "./ReviewModal";
import axios from "../../utils/axios";

function OrderItem({ item, order_status, delivery_date = "" }) {
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
  return (
    <>
      <div className="flex gap-2 items-start md:justify-around">
        <div className="avatar">
          <div className="w-24 rounded-lg relative">
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
          <div>
            {delivery_date !== "" && (
              <div className="flex flex-col">
                <span className="text-black text-lg font-semibold flex gap-2 items-center">
                  {!isMobile && (
                    <div
                      className={`w-3 h-3 ${
                        order_status === "SHP" ? "bg-green-600" : "bg-warning"
                      } rounded-full`}
                    ></div>
                  )}

                  {order_status === "SHP"
                    ? `Delivered on ${formatDate(delivery_date)}`
                    : `Expected Delivery on ${formatDate(delivery_date)}`}
                </span>
                <span className="">
                  {trimProductName(item.product.name, 20)}
                  <br />
                  {order_status === "SHP"
                    ? "Your item has been delivered"
                    : "Your item is yet to deliver"}
                </span>
                {order_status === "SHP" &&
                  (!orderItemReview ? (
                    <span
                      onClick={toggleReviewModal}
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
          <div className="flex flex-col">
            <h5 className="text-black text-lg font-semibold">
              {trimProductName(item.product.name, 20)}
            </h5>
            <span className="mr-2">Color: {item.product.color.name}</span>
            <span>Size: {item.product.size}</span>
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
