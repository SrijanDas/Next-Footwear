import React, { memo } from "react";
import Image from "next/image";

function BrandContainer({ brand }) {
  return (
    <div className="brandContainer flex items-center gap-2 py-4">
      <div className="brandImgContainer h-10 w-10 relative">
        <Image
          alt="image"
          src={brand.logo_url}
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* <h1 className="text-2xl font-semibold">{brand.name}</h1> */}
    </div>
  );
}

export default memo(BrandContainer);
