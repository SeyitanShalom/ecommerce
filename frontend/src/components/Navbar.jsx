"use client";
import Link from "next/link";
import logo from "../Assets/Frontend_Assets/logo.png";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ShopContext } from "@/Context/ShopContext";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  const { getTotalItems } = useContext(ShopContext);
  const [authToken, setAuthToken] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // controls safe rendering
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();
  const isHome = pathName === "/";
  const menuRef = useRef();

  const dropdownToggle = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("hidden");
      menuRef.current.classList.toggle("flex");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthToken(localStorage.getItem("auth-token"));
      setIsMounted(true);

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 100);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const NavLinks = [
    { name: "Shop", href: "/" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Kids", href: "/kids" },
  ];

  // Only skip rendering JSX — not hook calls
  if (!isMounted) {
    return <div className="h-[80px] w-full" />; // Placeholder to avoid layout shift
  }

  return (
    <div
      className={`w-full flex justify-between md:justify-around items-center px-7 md:px-0 py-4  md:py-5 transition-colors duration-300 ${
        isHome
          ? "bg-transparent text-white fixed left-0 z-10"
          : "bg-white text-gray-800"
      } ${isScrolled ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex items-center gap-1">
        <Image src={logo} alt="" className="w-6 md:w-7" />
        <h1 className="text-lg md:text-xl font-black">SHOPPER</h1>
      </div>

      <div className="block md:hidden text-2xl" onClick={dropdownToggle}>
        <TfiArrowCircleRight />
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-purple-400 px-10 py-3 md:py-0  flex-col items-center gap-5 md:text-[15px] lg:text-[18px] font-bold md:flex md:flex-row md:justify-center md:static md:w-auto md:bg-transparent md:gap-5 hidden shadow-md md:shadow-none transition-all duration-300 ${
          isHome ? "text-white" : "text-gray-800"
        }`}
        ref={menuRef}
      >
        {NavLinks.map((link) => {
          const isActive = pathName === link.href;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={
                isActive
                  ? "text-amber-500 focus:underline transition duration-200"
                  : `${isHome ? "text-white" : "text-gray-800"}`
              }
              onClick={dropdownToggle}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-5 items-center ">
        {authToken ? (
          <button
            className="border-2 rounded-full px-2 md:px-4 py-1 text-sm  hover:cursor-pointer"
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="border-2 rounded-full px-2 md:px-4 py-1 text-sm  hover:cursor-pointer">
              Login
            </button>
          </Link>
        )}

        <Link href="/cart">
          <div className="relative">
            <MdOutlineShoppingCart className="text-2xl" />
            <p className="bg-red-600 rounded-full p-1 flex justify-center items-center w-4 h-4 text-[12px] absolute -top-2 -right-2 text-white font-semibold">
              {getTotalItems()}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
