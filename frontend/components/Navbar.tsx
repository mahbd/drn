"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTING } from "@/store/config";
import dynamic from "next/dynamic";

const AuthStatus = dynamic(() => import("./AuthStatus"), {
  ssr: false,
  loading: () => <div className="skeleton h-8 w-12"></div>,
});

interface NavLink {
  id: string;
  title: string;
  children?: NavLink[];
}

export const navLinks = [
  {
    id: ROUTING.home,
    title: "Home",
  },
  {
    id: ROUTING.donations,
    title: "Donations",
  },
  {
    id: ROUTING.alerts,
    title: "Alerts",
  },
  {
    id: ROUTING.ourMission + "0",
    title: "About Us",
    children: [
      {
        id: ROUTING.partnersAndSponsors,
        title: "Partners and Sponsors",
      },
      {
        id: ROUTING.ourTeam,
        title: "Our Team",
      },
      {
        id: ROUTING.ourMission,
        title: "Our Mission",
      },
      {
        id: ROUTING.ourVision,
        title: "Our Vision",
      },
      {
        id: ROUTING.privacyPolicy,
        title: "Privacy Policy",
      },
      {
        id: ROUTING.termsAndConditions,
        title: "Terms and Conditions",
      },
    ],
  },
  {
    id: ROUTING.faq,
    title: "Faq",
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
          <DesktopLink navs={navLinks} />
        </div>
        <div className="navbar-end">
          <AuthStatus />
        </div>
      </nav>
      <div className="navbar bg-base-200 sm:hidden flex min-h-4 py-1 z-auto">
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
              className="menu menu-sm dropdown-content mt-3 z-[10] shadow bg-base-100 rounded-box w-60"
            >
              <MobileLink navs={navLinks} />
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

const DesktopLink = ({ navs }: { navs: NavLink[] }) => {
  return (
    <div>
      {navs.map((nav) => {
        if (nav.children) {
          return (
            <div
              key={nav.id}
              className="dropdown dropdown-bottom dropdown-hover cursor-pointer"
            >
              <div tabIndex={0}>{nav.title}</div>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[10]">
                {nav.children.map((child) => (
                  <li key={child.id}>
                    <a href={child.id} className={"whitespace-nowrap"}>
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return (
          <span key={nav.id} className="mx-1">
            <a href={`${nav.id}`}>{nav.title}</a>
          </span>
        );
      })}
    </div>
  );
};

const MobileLink = ({ navs }: { navs: NavLink[] }) => {
  const pathname = usePathname();
  return (
    <div>
      {navs.map((nav, index) => {
        if (nav.children) {
          return (
            <div key={nav.id} className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <li className="collapse-title cursor-pointer -ms-1">
                {nav.title}
              </li>
              <div className="collapse-content">
                <ul className={"-mt-5"}>
                  <MobileLink navs={nav.children} />
                </ul>
              </div>
            </div>
          );
        }
        return (
          <li
            key={nav.id}
            className={`cursor-pointer ${
              pathname.search(nav.id) === 0 ? "font-bold" : ""
            }`}
          >
            <a href={`${nav.id}`}>{nav.title}</a>
          </li>
        );
      })}
    </div>
  );
};
