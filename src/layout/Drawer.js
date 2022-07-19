import Link from "next/link";
import React from "react";
import {
  HiLogin,
  HiUserCircle,
  HiHome,
  HiHeart,
  HiShoppingBag,
  HiInformationCircle,
} from "react-icons/hi";

function Drawer({ isAuthenticated, drawerOpen, toggleDrawer }) {
  const listItems = [
    { name: "Home", href: "/", icon: <HiHome /> },
    { name: "Products", href: "/products", icon: <HiShoppingBag /> },
    { name: "Wishlist", href: "/wishlist", icon: <HiHeart /> },
    {
      name: isAuthenticated ? "Account" : "Login",
      href: isAuthenticated ? "account" : "/login",
      icon: isAuthenticated ? <HiUserCircle /> : <HiLogin />,
    },
    { name: "Help", href: "/help", icon: <HiInformationCircle /> },
  ];
  return (
    <div
      className={`w-auto lg:w-[35vw] z-50 bg-white h-full fixed top-0 left-0 ease-in-out duration-300 ${
        drawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="overflow-y-auto py-4 px-3 dark:bg-gray-800">
        <ul className="menu bg-base-100 w-full p-2 rounded-box">
          {listItems.map((item, index) => (
            <li key={index} onClick={toggleDrawer} className="text-lg">
              <Link href={item.href}>
                <a>
                  {item.icon}
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <button
            className="flex text-4xl text-black items-center cursor-pointer fixed left-52 top-1 z-50"
            onClick={() => setShowSidebar(false)}
          >
            x
          </button> */}
    </div>
  );
}

export default Drawer;
