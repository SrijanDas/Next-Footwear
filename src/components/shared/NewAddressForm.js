import { statesData } from "../../utils/india-state-and-district-list";
import { useEffect, useState } from "react";
import { useCallback } from "react";

function NewAddressForm({
  deliveryAddress,
  setDeliveryAddress,
  handleAddNewAddress,
}) {
  const [selectedState, setSelectedState] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(
    useCallback(() => {
      if (selectedState !== "") {
        let data = statesData.filter((state) => state.state === selectedState);
        setDistrictOptions(data[0].districts);
      }
    }, [selectedState]),
    [selectedState]
  );

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

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

      <div className="flex items-center gap-4">
        <div className="w-[50%]">
          <label className="label">
            <span className="label-text">State</span>
          </label>
          <select
            required
            onChange={(e) => {
              handleStateChange(e);
              setDeliveryAddress({
                ...deliveryAddress,
                state: e.target.value,
              });
            }}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Select State
            </option>
            {statesData.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[50%]">
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <select
            required
            onChange={(e) =>
              setDeliveryAddress({
                ...deliveryAddress,
                district: e.target.value,
              })
            }
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Select District
            </option>
            {districtOptions.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-4">
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
        <div className="w-[50%]">
          <label className="label">
            <span className="label-text">Pincode</span>
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
      </div>
      <div>
        <label className="label">
          <span className="label-text">Landmark</span>
          <span className="label-text-alt">(Optional)</span>
        </label>
        <input
          type="text"
          placeholder=""
          className="input input-bordered w-full"
          onChange={(e) =>
            setDeliveryAddress({
              ...deliveryAddress,
              landmark: e.target.value,
            })
          }
        />
      </div>
      <button type="submit" className="btn mt-4">
        {"Save & Continue"}
      </button>
    </form>
  );
}

export default NewAddressForm;
