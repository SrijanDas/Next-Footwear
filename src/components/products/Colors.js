import React, { memo } from "react";

const Yellow = ({ selectedColor, setSelectedColor }) => {
  return (
    <li onClick={() => setSelectedColor("yellow")} className="mr-4 last:mr-0">
      <span
        className={`block p-1 border-2 border-${
          selectedColor === "yellow" ? "gray-500" : "white"
        } hover:border-gray-500 rounded-full transition ease-in duration-300`}
      >
        <button className="block w-6 h-6 bg-yellow-500 rounded-full"></button>
      </span>
    </li>
  );
};

const Black = ({ selectedColor, setSelectedColor }) => {
  return (
    <li onClick={() => setSelectedColor("black")} className="mr-4 last:mr-0">
      <span
        className={`block p-1 border-2 border-${
          selectedColor === "black" ? "gray-500" : "white"
        } hover:border-gray-500 rounded-full transition ease-in duration-300`}
      >
        <button className="block w-6 h-6 bg-black rounded-full"></button>
      </span>
    </li>
  );
};

const Blue = ({ selectedColor, setSelectedColor }) => {
  return (
    <li onClick={() => setSelectedColor("blue")} className="mr-4 last:mr-0">
      <span
        className={`block p-1 border-2 border-${
          selectedColor === "blue" ? "gray-500" : "white"
        } hover:border-gray-500 rounded-full transition ease-in duration-300`}
      >
        <button className="block w-6 h-6 bg-blue-900 rounded-full"></button>
      </span>
    </li>
  );
};

const Gray = ({ selectedColor, setSelectedColor }) => {
  return (
    <li onClick={() => setSelectedColor("grey")} className="mr-4 last:mr-0">
      <span
        className={`block p-1 border-2 border-${
          selectedColor === "grey" ? "gray-500" : "white"
        } hover:border-gray-500 rounded-full transition ease-in duration-300`}
      >
        <button className="block w-6 h-6 bg-gray-500 rounded-full"></button>
      </span>
    </li>
  );
};

function Colors({ selectedColor, setSelectedColor, availableColors }) {
  return (
    <div className="my-4">
      <span className="mb-2 text-lg">Colors:</span>
      <ul className="flex flex-row items-center mt-2">
        {availableColors.map((color, index) =>
          color === "black" ? (
            <Black
              key={`${index}_${color}`}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          ) : color === "yellow" ? (
            <Yellow
              key={`${index}_${color}`}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          ) : color === "blue" ? (
            <Blue
              key={`${index}_${color}`}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          ) : color === "gray" ? (
            <Gray
              key={`${index}_${color}`}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}

export default memo(Colors);
