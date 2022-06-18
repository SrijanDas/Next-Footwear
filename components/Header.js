import Link from "next/link";
import React from "react";
import { HiMenu, HiShoppingCart, HiSearch } from "react-icons/hi";

function Header() {
  return (
    <nav className="flex flex-wrap p-3 bg-gray-800 justify-between items-center">
      <div className="navBrand flex items-center text-lg font-semibold text-white cursor-pointer">
        <HiMenu />
        <Link href="/">
          <h2 className="ml-2">Next Shoes</h2>
        </Link>
      </div>
      <div className="buttons flex gap-2 md:order-last">
        <button className="btn-white">Login</button>
        <button className="btn-green">
          <HiShoppingCart className="mr-2" />
          Cart (2)
        </button>
      </div>
      <div className="search mt-3 w-full md:mt-0 md:w-[60%]">
        <form className="flex bg-gray-50 rounded-lg">
          <input
            type="search"
            id="default-search"
            class="block p-2.5 w-full text-sm outline-none text-gray-900 rounded-lg"
            placeholder="Search here..."
            required
          />
          <button type="submit" class="btn-green">
            <HiSearch />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
