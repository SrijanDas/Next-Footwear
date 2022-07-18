import React from "react";
import { HiCheck } from "react-icons/hi";

function DeliveryDetails({
  deliveryDetails,
  setDeliveryDetails,
  deliveryDetailsFilled,
  setDeliveryDetailsFilled,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // let validator = Object.values(deliveryDetails).map((value) => {
    //   if (value === "") {
    //     alert("please fill all the fields");
    //     setDeliveryDetailsFilled(false);
    //     return false;
    //   }
    //   return true;
    // });
    setDeliveryDetailsFilled(true);
  };
  return (
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
        <div className="flex flex-col mt-3">
          <span className="text-gray-600 capitalize">
            {" "}
            <b>
              {`${deliveryDetails.first_name} ${deliveryDetails.last_name}`}
            </b>{" "}
            | {deliveryDetails.phone}
          </span>
          <span className="text-gray-600 capitalize">
            {deliveryDetails.address}, {deliveryDetails.city},{" "}
            {deliveryDetails.state} - <strong>{deliveryDetails.zipcode}</strong>
          </span>
        </div>
      ) : (
        <form
          className="form-control mt-2 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-4">
            <div className="w-[50%]">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                required
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    first_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-[50%]">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                required
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    last_name: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              placeholder=""
              className="input input-bordered w-full"
              required
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              required
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Zipcode</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              required
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  zipcode: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[50%]">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                required
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    state: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-[50%]">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                required
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    city: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button type="submit" className="btn mt-4 w-[40%] ml-auto">
            {"Save & Continue"}
          </button>
        </form>
      )}
    </div>
  );
}

export default DeliveryDetails;
