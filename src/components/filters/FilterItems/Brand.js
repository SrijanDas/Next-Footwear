import { useState } from "react";

const brandList = ["Nike", "Adidas", "Puma", "Reebok"];

function Brand() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const handleChange = (brand) => {
    const value = brand;
    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  return (
    <div className="py-3 px-4">
      {brandList.map((brand, i) => (
        <div key={i} className="form-control">
          <label className="cursor-pointer flex items-center gap-4 mb-4">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleChange(brand)}
              className="checkbox"
            />
            <span className="label-text">{brand}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Brand;
