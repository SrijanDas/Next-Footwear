import React, { memo } from "react";
import { HiOutlinePencil } from "react-icons/hi";

function Address({ address, showEditBtn = true }) {
  return (
    <div className="flex gap-4 w-full">
      <div className="flex flex-col">
        <span className="text-gray-600 capitalize">
          {" "}
          <b>{address.name}</b> | {address.phone}
        </span>
        <span className="text-gray-600 capitalize">
          {address.address}, {address.city}, {address.state} -{" "}
          <strong>{address.pincode}</strong>
        </span>
      </div>
      {showEditBtn && (
        <button className="btn btn-ghost btn-xs gap-1">
          <HiOutlinePencil className="h-5 w-5" />
          Edit
        </button>
      )}
    </div>
  );
}

export default memo(Address);
