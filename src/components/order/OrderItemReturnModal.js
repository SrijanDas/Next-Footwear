import React, { useState } from "react";
import axios from "../../utils/axios";

function OrderItemReturnModal({ itemId, isOpen, onClose, setItemReturned }) {
  const [reason, setReason] = useState("");
  const [isloading, setIsloading] = useState(false);
  const handleReturn = async (itemId, reason) => {
    setIsloading(true);
    await axios.post("return-item/", {
      itemId,
      reason,
    });
    onClose();
    setIsloading(false);
    setItemReturned((prev) => [...prev, itemId]);
    // window.location.reload();
  };
  return (
    <div className={`modal ${isOpen && "modal-open"}`}>
      <div className="modal-box relative">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Return Item</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            ✕
          </button>
        </div>
        <textarea
          className="mt-4 w-full textarea textarea-bordered textarea-primary"
          placeholder="Reason for returning this item..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        {/* <div className="mt-4"> */}
        <button
          onClick={() => handleReturn(itemId, reason)}
          className={`btn w-full mt-2 ${isloading && "loading"}`}
        >
          {isloading ? "Returning Item" : "Return Item"}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}

export default OrderItemReturnModal;
