import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import Address from "../shared/Address";
import NewAddressForm from "../shared/NewAddressForm";
// import Address from "../Address";
import Card from "../styled/Card";
import axios from "../../utils/axios";

function Addresses({ allAddress, setAllAddress }) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const toggleNewAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    landmark: "",
  });

  // useEffect(() => {
  //   console.log(newAddress);
  // }, [newAddress]);

  const handleAddNewAddress = async (e) => {
    e.preventDefault();

    let emptyValueCount = 0;
    for (const [key, value] of Object.entries(newAddress)) {
      if (value === "" && key !== "landmark") {
        toast.warning(`Please fill in "${key}"`);
        emptyValueCount++;
      }
    }

    if (emptyValueCount === 0) {
      const data = newAddress;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("nf_auth_token")
        )}`,
      };
      await axios
        .post("/accounts/address/", data, {
          headers: headers,
        })
        .then((res) => {
          setAllAddress((prev) => [...prev, res.data]);
        })
        .catch((e) => {
          console.error(e);
          toast.error("Something went wrong!");
        });

      toggleNewAddressForm();
    }
  };

  return (
    <Card title="My Addresses">
      <div className="flex flex-col">
        {allAddress.map((address, indx) => (
          <div key={address.id}>
            <Address address={address} />
            {indx !== allAddress.length - 1 && <hr className="my-2" />}
          </div>
        ))}
      </div>
      <button onClick={toggleNewAddressForm} className="btn mt-4">
        Add new address
      </button>
      <div className={`modal ${showAddressForm && "modal-open"}`}>
        <div className="modal-box relative">
          <div
            onClick={toggleNewAddressForm}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </div>
          <NewAddressForm
            handleAddNewAddress={handleAddNewAddress}
            deliveryAddress={newAddress}
            setDeliveryAddress={setNewAddress}
          />
        </div>
      </div>
    </Card>
  );
}

export default memo(Addresses);
