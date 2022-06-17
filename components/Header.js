import React from "react";
import { HiSearch, HiShoppingCart } from "react-icons/hi";

function Header() {
  return (
    <nav className="flex flex-wrap p-3 bg-gray-800 justify-between items-center">
      <div className="navBrand text-white">
        <h2 className="text-lg font-semibold cursor-pointer">Next Shoes</h2>
      </div>
      <div className="buttons flex gap-2 md:order-last">
        <button className="btn-white">Login</button>
        <button className="btn-green">
          <HiShoppingCart className="mr-2" />
          Cart (2)
        </button>
      </div>
      <div className="search p-2 mt-3 bg-white rounded-md w-[100%] md:mt-0 md:w-[60%]">
        Search Container
      </div>
    </nav>
  );
}

export default Header;
