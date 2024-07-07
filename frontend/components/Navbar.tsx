"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCurrentUser, logout } from "@/store/authService";
import { ROUTING } from "@/store/config";

export const navLinks = [
  {
    id: ROUTING.home,
    title: "Home",
  },
  {
    id: ROUTING.aboutUs,
    title: "About Us",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav className="sm:flex hidden navbar px-5 py-0 min-h-10 rounded-2xl bg-base-100">
        <div className="navbar-start">
          <Link href={"/"} className="btn btn-ghost btn-sm text-lg font-medium">
            DRN
          </Link>
          {navLinks.map((nav) => (
            <span key={nav.id} className="mx-1">
              <a href={`${nav.id}`}>{nav.title}</a>
            </span>
          ))}
        </div>
        <div className="navbar-end">
          <AuthStatus />
        </div>
      </nav>
      <div className="navbar bg-base-200 sm:hidden flex min-h-4 py-1">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-52"
            >
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] ${
                    pathname.search(nav.id) === 0 ? "font-bold" : ""
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                >
                  <a href={`${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href={"/"} className="btn btn-ghost btn-sm text-lg font-medium">
            DRN
          </Link>
        </div>
        <div className="navbar-end">
          <AuthStatus />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const AuthStatus = () => {
  const user = getCurrentUser();

  if (!user)
    return (
      <Link href={ROUTING.login} className="nav-link">
        Login
      </Link>
    );

  return (
    <div className="dropdown dropdown-end max-h-4">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm btn-circle avatar -m-2"
      >
        <div className="w-10 rounded-full">
          <div className="w-10 h-10 bg-green-600">
            <p className="pt-1 text-lg font-bold uppercase">{user.email![0]}</p>
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href={ROUTING.profile} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        {user.role === "admin" && (
          <li>
            <Link href={ROUTING.admin} className="justify-between">
              Admin Panel
              <span className="badge">New</span>
            </Link>
          </li>
        )}
        <li>
          <button onClick={() => logout()} className={"btn btn-xs btn-error"}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};
