"use client";
import Image from "next/image";
import React, { useState } from "react";
import Cookies from "js-cookie";
type Props = {};

const NavBar = (props: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={handleSidebarToggle}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <Image
                  src="/assets/images/logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="mx-6 flex gap-5">
                  {/* <ModeToggle /> */}
                  <i className="fi fi-rr-settings"></i>
                  <i className="fi fi-rs-bell"></i>
                </div>
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                      alt="user photo"
                      width={32}
                      height={32}
                      className="rounded-full h-8 w-8 object-cover"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        aria-label="Sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="flex flex-col h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2">
            <NavList label="Homepage" icon="fi fi-rr-home" />
            <NavList label="Portfolio" icon="fi fi-rr-document" />
            <NavList label="Referrals" icon="fi fi-rs-users" />
            <hr />
            <NavList label="Courses" icon="fi fi-rr-book-alt" />
          </ul>
          <ul className="space-y-2 mt-auto mb-0">
            <hr />
            <NavList label="Settings" icon="fi fi-rr-settings" />
            <NavList
              label="Logout"
              icon="fi fi-br-sign-out-alt"
              href="/signin"
              onClick={() => {
                Cookies.remove("token");
              }}
            />
          </ul>
          <div className="mt-10 text-xs text-center text-gray-400">
            All rights reserved to Edapt © 2024.
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NavBar;

interface NavProps {
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
}

const NavList: React.FC<NavProps> = ({ label, icon, href, onClick }) => {
  return (
    <li onClick={onClick}>
      <a
        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-[#6648D6] hover:text-white dark:hover:bg-[#6648D6] group"
        href={href}
      >
        <i className={icon}></i>
        <span className="ml-3">{label}</span>
      </a>
    </li>
  );
};
