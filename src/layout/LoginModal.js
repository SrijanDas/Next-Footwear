import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function LoginModal({ isOpen, closeModal }) {
  const router = useRouter();

  return (
    <>
      {/* <label
        id="login-modal-btn"
        htmlFor="login-modal"
        // className="btn modal-button"
      ></label>

      <input type="checkbox" id="login-modal" className="modal-toggle" /> */}
      <div className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box relative">
          <label
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">You are not logged in!</h3>
          <p className="py-4">Get Access to your Orders, Wishlist and more.</p>
          <div className="modal-action items-center justify-between mt-2 gap-2">
            <button
              onClick={() => {
                router.replace("/signup");
                closeModal();
              }}
              htmlFor="login-modal"
              className="btn-link flex flex-col md:flex-row md:gap-1"
            >
              <span>New to NFootwear?</span>
              <span>Create an account</span>
            </button>

            <button
              onClick={() => {
                router.replace("/login");
                closeModal();
              }}
              htmlFor="login-modal"
              className="btn btn-green"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
