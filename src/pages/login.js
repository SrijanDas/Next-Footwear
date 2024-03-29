import axios from "../utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../store/actions/authActions";
import Loader from "../components/shared/Loader";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleSunmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill all fields");
      return;
    }

    const body = {
      email,
      password,
    };

    await axios
      .post("/auth/token/login/", body)
      .then(({ data }) => {
        router.push("/");
        localStorage.setItem("nf_auth_token", JSON.stringify(data.auth_token));
        dispatch(load_user());
      })
      .catch((e) => {
        const errorData = e.response.data;
        errorData.non_field_errors &&
          toast.error(errorData.non_field_errors[0]);
        console.error(e);
        setIsLoading(false);
      });
  };

  if (typeof window !== undefined && isAuthenticated) {
    router.replace("/");
    return <span className="mx-auto">Redirecting...</span>;
  } else {
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
              className={`btn btn-green outline-none border-none ${
                isLoading && "loading"
              }`}
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
      </div>
    );
  }
}

export default login;
