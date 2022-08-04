import React, { useEffect, useState } from "react";
import { HiCheck, HiPlusCircle } from "react-icons/hi";
import axios from "../../helpers/axios";
import NewAddressForm from "./NewAddressForm";
import Address from "../Address";

// const Address = ({ address, showCheckbox = false, handleAddressChange }) => {
//   return (
//     <label className="flex gap-4 my-2 items-center cursor-pointer">
//       {showCheckbox && (
//         <input
//           type="radio"
//           name="radio-2"
//           className="radio radio-primary"
//           onChange={() => handleAddressChange(address.id)}
//         />
//       )}
//       <div className="flex flex-col mt-3">
//         <span className="text-gray-600 capitalize">
//           {" "}
//           <b>{address.name}</b> | {address.phone}
//         </span>
//         <span className="text-gray-600 capitalize">
//           {address.address}, {address.city}, {address.state} -{" "}
//           <strong>{address.zipcode}</strong>
//         </span>
//       </div>
//     </label>
//   );
// };

function DeliveryDetails({
  deliveryAddress,
  setDeliveryAddress,
  deliveryDetailsFilled,
  setDeliveryDetailsFilled,
}) {
  const [allAddress, setAllAddress] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // fetching addresses
  useEffect(() => {
    axios
      .get("/accounts/address/", {
        headers: {
          Authorization: `Token ${JSON.parse(
            localStorage.getItem("nf_auth_token")
          )}`,
        },
      })
      .then((res) => {
        setAllAddress(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddressChange = (addressId) => {
    let address = allAddress.find((address) => address.id === addressId);
    setDeliveryAddress(address);
  };

  const handleDeliverHere = (e) => {
    e.preventDefault();
    setDeliveryDetailsFilled(true);
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      const data = deliveryAddress;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(
          localStorage.getItem("nf_auth_token")
        )}`,
      };
      const res = await axios.post("/accounts/address/", data, {
        headers: headers,
      });
      setDeliveryAddress(res.data);
      setDeliveryDetailsFilled(true);
    } catch (error) {
      console.log(error);
      setDeliveryDetailsFilled(false);
    }
  };
  return (
    <>
      <div className="DeliveryDetails bg-white rounded-lg border border-gray-200 shadow-md p-4">
        <div className="border-b-2 border-gray-300 pb-2">
          <span className="text-xl font-semibold text-gray-500 uppercase flex gap-2 items-center">
            Delivery Details
            {deliveryDetailsFilled && (
              <div className="badge badge-md badge-primary">
                <HiCheck />
              </div>
            )}
          </span>
        </div>
        {deliveryDetailsFilled ? (
          <div className="mt-2">
            <Address address={deliveryAddress} showEditBtn={false} />
          </div>
        ) : (
          <div className="mt-2">
            {allAddress.length > 0 ? (
              allAddress.map((address) => (
                <div className="my-4" key={address.id}>
                  <label className="flex gap-4 items-center cursor-pointer">
                    <input
                      type="radio"
                      name="radio-2"
                      className="radio radio-primary"
                      onChange={() => handleAddressChange(address.id)}
                    />

                    <Address address={address} />
                  </label>
                  {deliveryAddress.id === address.id && (
                    <button
                      onClick={handleDeliverHere}
                      className="btn mt-2 ml-10"
                    >
                      Deliver Here
                    </button>
                  )}
                </div>
              ))
            ) : (
              <span className="text-gray-600">No address added yet</span>
            )}
          </div>
        )}
      </div>
      {!deliveryDetailsFilled && (
        <div className="DeliveryDetails bg-white rounded-lg border border-gray-200 shadow-md p-4">
          {showAddressForm ? (
            <div className="border-b-2 border-gray-300 pb-2">
              <span className="text-xl font-semibold text-gray-500 uppercase flex gap-2 items-center">
                Add a New Address
                {deliveryDetailsFilled && (
                  <div className="badge badge-md badge-primary">
                    <HiCheck />
                  </div>
                )}
              </span>
            </div>
          ) : (
            <button
              onClick={() => setShowAddressForm(true)}
              className="w-full btn btn-ghost gap-2 normal-case"
            >
              <HiPlusCircle className="h-5 w-5" />
              Add New Address
            </button>
          )}
          {showAddressForm && (
            <NewAddressForm
              deliveryAddress={deliveryAddress}
              setDeliveryAddress={setDeliveryAddress}
              handleAddNewAddress={handleAddNewAddress}
            />
          )}
        </div>
      )}
    </>
  );
}

export default DeliveryDetails;
