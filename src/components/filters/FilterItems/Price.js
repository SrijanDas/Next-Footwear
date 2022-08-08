import React, { useState } from "react";

const startingPrice = 1000;
const priceStep = 1500;

function Price() {
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  return (
    <div className="py-3 px-4">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="form-control">
          <label className="cursor-pointer flex items-center gap-4 mb-4">
            <input
              type="checkbox"
              checked={selectedPriceRange.id === i}
              onChange={() =>
                setSelectedPriceRange({
                  id: i,
                  min: startingPrice + i * priceStep,
                  max: startingPrice + (i + 1) * priceStep,
                })
              }
              className="checkbox"
            />
            <span className="label-text">
              {`Rs. ${startingPrice + i * priceStep} - Rs. ${
                startingPrice + (i + 1) * priceStep - 1
              }`}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Price;
