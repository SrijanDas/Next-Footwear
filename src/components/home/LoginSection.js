import React from "react";
import { useRouter } from "next/router";

function LoginSection() {
  const router = useRouter();
  return (
    <div className="loginSection p-4 md:p-10 flex flex-col items-center justify-center gap-2 text-center shadow-lg">
      <div>
        <h3 className="text-2xl font-bold">Welcome</h3>
        <p className="">
          Please login to get Access to your Orders, Wishlist and more.
        </p>
      </div>

      <button
        onClick={() => {
          router.replace("/login");
        }}
        htmlFor="login-modal"
        className="btn btn-green w-1/4"
      >
        Login
      </button>
      <button
        onClick={() => {
          router.replace("/signup");
        }}
        htmlFor="login-modal"
        className="link flex gap-1"
      >
        <span>New to NFootwear?</span>
        <span>Create an account</span>
      </button>
    </div>
  );
}

export default LoginSection;
