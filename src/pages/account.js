import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { useRouter } from "next/router";
import OrderCard from "../components/account/OrderCard";

function account() {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const router = useRouter();

  if (typeof window !== undefined && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center my-4">
        <h1>{user.username}</h1>
        <button onClick={handleLogout} className="btn btn-outline">
          Logout
        </button>
      </div>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default account;
