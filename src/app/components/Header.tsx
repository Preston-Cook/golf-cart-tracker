"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Monoton } from "next/font/google";

const monoton = Monoton({ weight: "400", subsets: ["latin"] });

export default function Navbar() {
  const pathname = usePathname();
  const links = ["Logs", "Contact"];

  const activeClasses =
    "block py-2 px-3 text-white bg-[#5A3E2B] rounded md:bg-transparent text-white md:p-0";
  const inactiveClasses =
    "block py-2 px-3 text-[#5A3E2B] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0";

  return (
    <nav className=" border-gray-200 bg-[#d38e31]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            className={`self-center text-lg font-semibold whitespace-nowrap text-[#5A3E2B] ${monoton.className}`}
          >
            🏝️ &nbsp;GOLF&nbsp; CART&nbsp; LOGGER
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#5A3E2B] rounded-lg md:hidden bg-[#77C7AE] focus:outline-none focus:ring-2 focus:ring-[#5A3E2B]"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border-2 border-white rounded-lg bg-[#77C7AE] md:px-5 md:py-1 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <Link
                href="/"
                className={pathname === "/" ? activeClasses : inactiveClasses}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {links.map((el, i) => {
              const route = `/${el.toLowerCase()}`;

              return (
                <li key={i}>
                  <a
                    href={route}
                    className={
                      pathname === route ? activeClasses : inactiveClasses
                    }
                  >
                    {el}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
