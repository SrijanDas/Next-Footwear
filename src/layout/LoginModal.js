import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function LoginModal() {
  const router = useRouter();
  return (
    <>
      <label
        id="login-modal-btn"
        htmlFor="login-modal"
        // className="btn modal-button"
      ></label>

      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            id="login-modal-close"
            htmlFor="login-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">You are not logged in!</h3>
          <p className="py-4">Get Access to your Orders, Wishlist and more.</p>
          <div className="modal-action items-center justify-between mt-2">
            <button
              onClick={() => {
                router.replace("/signup");
                document.getElementById("login-modal").checked = false;
              }}
              htmlFor="login-modal"
              className="btn-link"
            >
              New to NFootwear? Create an account
            </button>

            <button
              onClick={() => {
                router.replace("/login");
                document.getElementById("login-modal").checked = false;
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
