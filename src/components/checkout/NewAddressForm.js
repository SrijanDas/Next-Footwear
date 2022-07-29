import React from "react";

function NewAddressForm({
  deliveryAddress,
  setDeliveryAddress,
  handleAddNewAddress,
}) {
  return (
    <form
      className="form-control mt-2 flex flex-col gap-2"
      onSubmit={handleAddNewAddress}
    >
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder=""
          className="input input-bordered w-full"
          required
          onChange={(e) =>
            setDeliveryAddress({
              ...deliveryAddress,
              name: e.target.value,
            })
          }
        />
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
            setDeliveryAddress({
              ...deliveryAddress,
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
            setDeliveryAddress({
              ...deliveryAddress,
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
            setDeliveryAddress({
              ...deliveryAddress,
              pincode: e.target.value,
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
              setDeliveryAddress({
                ...deliveryAddress,
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
              setDeliveryAddress({
                ...deliveryAddress,
                city: e.target.value,
              })
            }
          />
        </div>
      </div>
      <button type="submit" className="btn mt-4">
        {"Save & Continue"}
      </button>
    </form>
  );
}

export default NewAddressForm;
