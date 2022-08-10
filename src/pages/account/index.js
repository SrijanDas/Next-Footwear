import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import AccountInfo from "../../components/account/AccountInfo";
import Orders from "../../components/account/Orders";
import Addresses from "../../components/account/Addresses";
import Card from "../../components/styled/Card";
import Spinner from "../../components/shared/Spinner";

function Account() {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [allAddress, setAllAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetData = async () => {
      await axios
        .get("accounts/address/", {
          headers: {
            Authorization: `Token ${JSON.parse(
              localStorage.getItem("nf_auth_token")
            )}`,
          },
        })
        .then((res) => {
          setAllAddress(res.data);
        });

      await axios
        .get("orders/", {
          headers: {
            Authorization: `Token ${JSON.parse(
              localStorage.getItem("nf_auth_token")
            )}`,
          },
        })
        .then((res) => {
          setOrders(res.data);
        });
      setIsLoading(false);
    };
    fetData();
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
    <div className="p-2 md:p-10 flex flex-col gap-1 w-full max-w-4xl mx-auto">
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <Spinner />
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <AccountInfo user={user} />
          <Orders orders={orders} />
          <Addresses allAddress={allAddress} />
          <Card>
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
              <div className="bg-base-300 rounded-lg p-4 text-center w-full md:w-1/3">
                <span className="text-3xl font-bold">Next Footwear</span>
              </div>
              <div>
                <button className="btn btn-ghost">Feedback</button>
                <button className="btn btn-ghost">Help Centre</button>
                <button onClick={handleLogout} className="btn btn-ghost">
                  Logout
                </button>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

export default Account;
