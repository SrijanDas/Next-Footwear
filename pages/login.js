import axios from "../helpers/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSunmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill all fields");
      return;
    }
    const formData = {
      username: email,
      password,
    };
    await axios
      .post("/auth/token/login/", formData)
      .then(({ data }) => {
        localStorage.setItem("nf_auth_token", JSON.stringify(data.auth_token));
        router.push("/");
      })
      .catch((e) => {
        const errorData = e.response.data;
        errorData.non_field_errors &&
          toast.error(errorData.non_field_errors[0]);
        console.error(e);
      });
  };

  return (
    <div className="p-10 bg-white">
      <div className="max-w-sm mx-auto h-auto flex flex-col gap-4">
        <span className="text-2xl text-center">Log In</span>

        <form onSubmit={handleSunmit} className="flex flex-col gap-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link href="/forgot-password">
            <span className="link text-center">Forgot Password?</span>
          </Link>
          <button
            type="submit"
            className="btn btn-green outline-none border-none"
          >
            Login
          </button>
        </form>

        <span>
          Or
          <Link href="/signup">
            <span className="mx-1 link">click here</span>
          </Link>
          to sign-up!
        </span>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default login;
