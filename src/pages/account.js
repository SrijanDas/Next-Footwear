import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { useRouter } from "next/router";
import OrderCard from "../components/account/OrderCard";
import axios from "../helpers/axios";

function account() {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("orders/all", {
        headers: {
          Authorization: `Token ${JSON.parse(
            localStorage.getItem("nf_auth_token")
          )}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

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
    <div className="p-4 md:p-10">
      <div className="flex justify-between items-center my-4">
        <h1>{user.email}</h1>
        <button onClick={handleLogout} className="btn btn-outline">
          Logout
        </button>
      </div>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <div className="text-center">
          <h1>No orders yet</h1>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default account;
