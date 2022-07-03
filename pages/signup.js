import React, { useState } from "react";
import Link from "next/link";
import axios from "../helpers/axios";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const [error, setError] = useState({ status: false, message: "" });
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSunmit = async (e) => {
    e.preventDefault();
    if (password1.length < 8) {
      setError({
        status: true,
        message: "Password must be at least 6 characters long",
      });
      return;
    }
    if (password1 !== password2) {
      setError({ status: true, message: "Passwords do not match" });
      return;
    }

    const formData = {
      username: email,
      password: password1,
      re_password: password2,
    };

    await axios
      .post("/auth/users/", formData)
      .then((res) => {
        setSignupSuccess(true);
      })
      .catch((e) => {
        console.error(e);
        const errorMessages = e.response.data.password ||
          e.response.data.username || ["Something went wrong !"];

        for (const m of errorMessages) {
          toast.error(m);
        }
      });

    setError({ status: false, message: "" });
  };

  return (
    <>
      <div className="p-10 bg-white">
        <div className="max-w-sm mx-auto">
          {signupSuccess ? (
            <div class="alert alert-success shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Account created!</span>
              </div>
            </div>
          ) : (
            <>
              <span className="text-2xl font-semibold">Sign Up</span>
              <form
                autoComplete="off"
                onSubmit={handleSunmit}
                className="flex flex-col gap-2 mt-5"
              >
                <div>
                  <label className="label">
                    <span className="label-text">Email / Username</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="input input-bordered w-full"
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Repeat Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password Again"
                    className="input input-bordered w-full"
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                </div>
                {error.status && (
                  <div className="alert alert-error shadow-lg mt-2 rounded-md">
                    <span>{error.message}</span>
                  </div>
                )}
                <button type="submit" className="btn mt-2">
                  Sign up
                </button>
              </form>
            </>
          )}
          <div className="divider"></div>
          <span>
            <Link href="/login">
              <span className="mx-1 link">Click here</span>
            </Link>
            to log in!
          </span>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default SignUp;
