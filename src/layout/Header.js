import Link from "next/link";
import React from "react";
import {
  HiMenu,
  HiShoppingCart,
  HiSearch,
  HiUser,
  HiChevronDown,
} from "react-icons/hi";
import { isBrowser } from "react-device-detect";

function Header({ isAuthenticated, firstName, totalItems, toggleDrawer }) {
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
              <a className="ml-1">{isBrowser ? "NFootwear" : "NF"}</a>
            </Link>
          </div>
          <div className="rightBtns flex md:order-last">
            <div className="dropdown dropdown-hover">
              <label tabIndex="0" className="btn btn-black gap-2">
                Products
                <HiChevronDown className="" />
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/products">
                    <a>Men</a>
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    <a>Women</a>
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    <a>Kids</a>
                  </Link>
                </li>
              </ul>
            </div>

            {isAuthenticated ? (
              <Link href={"/account"}>
                <button className="btn gap-1 btn-black capitalize">
                  <HiUser className="h-5 w-5" />
                  {firstName ? firstName : "Account"}
                </button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <button className="btn btn-black">Login</button>
              </Link>
            )}

            <Link href="/cart">
              <button className="btn btn-black border-none">
                {/* <div className="indicator"> */}
                <HiShoppingCart className="h-5 w-5 text-green-500" />
                <span className="badge badge-sm indicator-item">
                  {totalItems}
                </span>
                {/* </div> */}
              </button>
            </Link>
          </div>
          <div className="search mt-3 w-full md:mt-0 md:w-[50%]">
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
