import React, { useEffect, useState } from "react";
import axios from "../helpers/axios";
import { ToastContainer, toast } from "react-toastify";

function account() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("/auth/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${JSON.parse(
            localStorage.getItem("nf_auth_token")
          )}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  }, []);

  return (
    <div>
      <h1>{user.username}</h1>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default account;
