"use client";
import Link from "next/link";
import { TfiAlignJustify } from "react-icons/tfi";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import Image from "next/image";
import OutsideClickHandler from "react-outside-click-handler";
import Search from "./Search";

const Nav = () => {
  const [isSearchClick, setisSearchClick] = useState(false);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  const handleToggleDropdown = () => {
    settoggleDropdown(!toggleDropdown);
  };

  return (
    <nav className="h-16 bg-secondary">
      <div className="flex items-center justify-between h-full container mx-auto text-white px-6">
        <Link href="/" className="flex hover:text-primary hover:transition-all">
          <Image src="/assets/images/babs-burger.png" width={60} height={60} />
        </Link>

        {/*#Desktop Navigation*/}
        <div className="sm:flex hidden gap-3 md:gap-5">
          <div className="flex">
            <Link href="/" className="black_btn">
              ANASAYFA
            </Link>
          </div>

          <div className="flex">
            <Link href="/menu" className="black_btn">
              MENÜ
            </Link>
          </div>

          <div className="flex">
            <Link href="/about" className="black_btn">
              HAKKIMIZDA
            </Link>
          </div>
        </div>

        <div className="sm:flex hidden gap-3">
          <button>
            <FaSearch
              className="hover:text-primary transition-all"
              onClick={() => setisSearchClick(true)}
            />
          </button>
        </div>

        {/*#Mobile Navigation*/}

        <div className="sm:hidden flex relative gap-x-3 justify-between items-center">
          <button>
            <FaSearch
              className="hover:text-primary transition-all"
              onClick={() => setisSearchClick(true)}
            />
          </button>

          <div className="flex">
            <TfiAlignJustify
              onClick={handleToggleDropdown}
              className="hover:text-primary transition-all cursor-pointer"
            />

            {toggleDropdown && (
              <div className="absolute  mt-2  bg-white shadow-lg dropdown z-10">
                <div className="flex flex-col">
                  <Link href="/" className="dropdown_link">
                    ANASAYFA
                  </Link>

                  <Link href="/menu" className="dropdown_link">
                    MENÜ
                  </Link>

                  <Link href="/about" className="dropdown_link">
                    HAKKIMIZDA
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isSearchClick && <Search setisSearchClick={setisSearchClick} />}
    </nav>
  );
};

export default Nav;
