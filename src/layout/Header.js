import Link from "next/link";
import React, { useState } from "react";
import { HiMenu, HiShoppingCart, HiSearch } from "react-icons/hi";
import Sidebar from "./Sidebar";

function Header({ isAuthenticated, cart }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <nav className="bg-gray-800 sticky top-0 z-40">
        <div className="flex flex-wrap mx-auto p-3 justify-between items-center max-w-[2000px]">
          <div className="navBrand flex items-center text-lg font-semibold text-white cursor-pointer">
            <HiMenu onClick={() => setShowSidebar(true)} />
            <Link href="/">
              <h2 className="ml-2">NFootwear</h2>
            </Link>
          </div>
          <div className="buttons flex gap-2 md:order-last">
            {isAuthenticated ? (
              <Link href={"/account"}>
                <button className="btn-white">My Account</button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <button className="btn-white">Login</button>
              </Link>
            )}

            <Link href="/cart">
              <button className="btn-green">
                <HiShoppingCart className="mr-2" />
                Cart ({cart.totalItems})
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
      <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
    </>
  );
}

export default Header;
