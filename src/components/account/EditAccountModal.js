import React from "react";

function EditAccountModal({ showEditModal, setShowEditModal, user }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Account Information</h3>
        <div className="my-2 flex flex-col gap-2">
          <div className="">
            <input
              type="text"
              placeholder="Type here"
              className="input input-primary w-full max-w-xs"
            />
          </div>
        </div>
        <div className="modal-action">
          <label onClick={() => setShowEditModal(false)} className="btn">
            Yay!
          </label>
        </div>
      </div>
    </div>
  );
}

export default EditAccountModal;
