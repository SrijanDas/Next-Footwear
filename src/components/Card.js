import React from "react";
import Image from "next/image";

function Card({ product }) {
  const handleClick = () => {
    console.log("clicked", product.name);
  };
  return (
    <div className="w-50 h-auto flex justify-center items-center ">
      <div className="w-full h-full ">
        <div className="card h-full flex flex-col justify-center p-5 bg-white rounded-lg shadow-xl">
          <div onClick={handleClick} className="prod-title cursor-pointer">
            <p className="text-xl uppercase text-gray-900 hover:text-red-900 font-bold">
              {product.name.slice(0, 50)}
              {product.name.length > 50 ? "..." : ""}
            </p>
            {/* <p className="uppercase text-sm text-gray-400">{product.name}</p> */}
          </div>
          <div onClick={handleClick} className="prod-img cursor-pointer">
            <Image
              src={product.img}
              className="w-full object-cover object-center"
              width={200}
              height={200}
            />
          </div>
          <div className="prod-info grid gap-4">
            <div>
              <ul className="flex flex-row justify-center items-center">
                <li className="mr-4 last:mr-0">
                  <span className="block p-1 border-2 border-gray-500 rounded-full transition ease-in duration-300">
                    <a
                      href="#blue"
                      className="block w-6 h-6 bg-blue-900 rounded-full"
                    ></a>
                  </span>
                </li>
                <li className="mr-4 last:mr-0">
                  <span className="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                    <a
                      href="#yellow"
                      className="block w-6 h-6 bg-yellow-500 rounded-full"
                    ></a>
                  </span>
                </li>
                <li className="mr-4 last:mr-0">
                  <span className="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                    <a
                      href="#red"
                      className="block w-6 h-6 bg-red-500 rounded-full"
                    ></a>
                  </span>
                </li>
                <li className="mr-4 last:mr-0">
                  <span className="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                    <a
                      href="#green"
                      className="block w-6 h-6 bg-green-500 rounded-full"
                    ></a>
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 justify-between items-center text-gray-900">
              <p
                onClick={handleClick}
                className="font-bold text-xl cursor-pointer hover:text-red-900"
              >
                ₹{product.price}
              </p>
              <button
                onClick={handleClick}
                className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
