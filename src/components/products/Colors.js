import Image from "next/image";
import React, { memo } from "react";

function Colors({ selectedColor, availableColors, handleColorChange }) {
  return (
    <div className="my-4">
      <span className="mb-2 text-lg">Colors:</span>
      <div className="flex gap-2 items-center mt-2">
        {availableColors.map((color, index) => (
          <div
            className={`tooltip cursor-pointer border-2 rounded flex flex-col justify-center ${
              selectedColor === color.color_slug && "border-indigo-500"
            }`}
            data-tip={color.color}
            key={`${index}_${color.color}`}
            onClick={() => handleColorChange(color.color_slug)}
          >
            <div className="avatar ">
              <div className="w-16 rounded">
                <Image
                  src={color.image_url}
                  className="rounded"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Colors);
