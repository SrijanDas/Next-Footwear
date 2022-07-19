import Link from "next/link";
import React from "react";
import {
  HiMenu,
  HiShoppingCart,
  HiSearch,
  HiChevronDown,
} from "react-icons/hi";

function Header({ isAuthenticated, totalItems, toggleDrawer }) {
  return (
    <>
      <nav className="bg-gray-800 sticky top-0 z-30">
        <div className="flex flex-wrap mx-auto p-3 justify-between items-center max-w-[2000px]">
          <div className="navBrand flex items-center text-lg font-semibold text-white">
            <button
              onClick={toggleDrawer}
              className="btn px-2 py-1 bg-gray-800 border-gray-800"
            >
              <HiMenu className="w-6 h-6" />
            </button>
            <Link href="/">
              <a className="ml-2">NFootwear</a>
            </Link>
          </div>
          <div className="buttons flex gap-2 md:order-last">
            {/* <Link href="/products">
              <button className="btn gap-2">
                Products
                <HiChevronDown className="" />
              </button>
            </Link> */}
            <div className="hidden md:contents">
              {isAuthenticated ? (
                <Link href={"/account"}>
                  <button className="btn btn-white">My Account</button>
                </Link>
              ) : (
                <Link href={"/login"}>
                  <button className="btn btn-white">Login</button>
                </Link>
              )}
            </div>

            <Link href="/cart">
              <button className="btn gap-2 btn-green">
                <HiShoppingCart className="" />
                Cart ({totalItems})
              </button>
            </Link>
          </div>
          <div className="search mt-3 w-full md:mt-0 md:w-[60%]">
            <form className="flex bg-gray-50 rounded-lg">
              <input
                type="search"
                id="default-search"
                className="block p-2.5 w-full text-sm outline-none text-gray-900 rounded-lg"
                placeholder="Search here..."
                required
              />
              <button type="submit" className="btn-green">
                <HiSearch />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
