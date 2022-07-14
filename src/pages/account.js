import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { useRouter } from "next/router";

function account() {
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const router = useRouter();

  if (typeof window !== undefined && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1>{user.username}</h1>
        <button onClick={handleLogout} className="btn btn-outline">
          Logout
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default account;
