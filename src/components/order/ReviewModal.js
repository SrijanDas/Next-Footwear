import { useState } from "react";

function ReviewModal({ isOpen, onClose, submitReview }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submittingReview, setsubmittingReview] = useState(false);

  return (
    <div className={`modal ${isOpen && "modal-open"}`}>
      <div className="modal-box relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">Review</h3>
        <div className="mt-4 flex flex-col gap-4">
          <div className="rating rating-md">
            {Array.from({ length: 5 }, (_, i) => (
              <input
                key={i}
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked={rating === i}
                onChange={() => setRating(i)}
              />
            ))}
          </div>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button
            onClick={async () => {
              setsubmittingReview(true);
              await submitReview(rating, review);
              setsubmittingReview(false);
            }}
            className={`btn ${submittingReview && "loading"}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
