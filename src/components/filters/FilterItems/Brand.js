import Image from "next/image";

function Brand({ selectedBrands, handleBrandChange, brandList }) {
  return (
    <div className="py-3 px-4">
      {brandList.map((brand) => (
        <div key={brand.id} className="form-control">
          <label className="cursor-pointer flex items-center gap-4 mb-4">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand.slug) ? true : false}
              onChange={() => handleBrandChange(brand.slug)}
              className="checkbox"
            />

            <span className="label-text">{brand.name}</span>
            <div className="avatar">
              <div className="w-6 rounded relative">
                <Image
                  src={brand.logo_url}
                  alt="brand-image"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Brand;
