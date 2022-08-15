import React, { useState, useEffect, memo } from "react";
import { HiStar } from "react-icons/hi";
import axios from "../../utils/axios";
import formatDate from "../../utils/formatDate";
import Rating from "../shared/Rating";
import ReviewSkeleton from "../skeletons/ReviewSkeleton";

function ReviewsSection({ productId, productRating }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`/reviews?color_variant_id=${productId}`);
      setReviews(res.data);
      setIsLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <div className="py-5">
      <h1 className="text-2xl font-bold">Customer Reveiews</h1>
      <div className="mb-5">
        <div className="text-lg text-gray-500 antialiased flex gap-2">
          <span className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <HiStar
                key={i}
                className={`w-6 h-6 ${
                  i >= Math.floor(productRating.rating)
                    ? "text-green-200"
                    : "text-green-600"
                } `}
              />
            ))}
          </span>

          <span>{productRating.rating} out of 5</span>
        </div>

        <span>
          {productRating.review_count === 1
            ? `${productRating.review_count} Review`
            : `${productRating.review_count} Reviews`}
        </span>
      </div>

      {isLoading ? (
        <ReviewSkeleton />
      ) : (
        reviews.map((review, i) => (
          <div key={i} className="my-4">
            <div className="flex items-center gap-2">
              <Rating rating={review.rating} />
              <span className="font-bold">{review.username}</span>
            </div>
            <p className="text-sm text-gray-500">
              Reviewed on {formatDate(review.date)}
            </p>
            <div className="mt-2">{review.review}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default memo(ReviewsSection);
