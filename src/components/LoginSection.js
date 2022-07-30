import React from "react";
import { useRouter } from "next/router";

function LoginSection() {
  const router = useRouter();
  return (
    <section className="p-4 md:p-10 flex flex-col items-center justify-center gap-2">
      <h3 className="text-lg font-bold">You are not logged in!</h3>
      <p>Get Access to your Orders, Wishlist and more.</p>
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
    </section>
  );
}

export default LoginSection;
