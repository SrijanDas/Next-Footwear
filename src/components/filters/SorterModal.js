import React from "react";

function SorterModal({ isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen && "modal-open"} modal-bottom`}>
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-500 uppercase">
            SORT BY
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            ✕
          </button>
        </div>

        <div className="divider"></div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Popularity</span>
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-blue-500"
              checked
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Price -- Low to High</span>
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-blue-500"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Price -- High to Low</span>
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-blue-500"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Newest Firsts</span>
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SorterModal;
