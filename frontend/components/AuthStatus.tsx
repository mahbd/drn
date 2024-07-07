"use client";

import { getCurrentUser, logout } from "@/store/authService";
import Link from "next/link";
import { ROUTING } from "@/store/config";

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
            <p className="text-lg font-bold uppercase me-2">{user.email![0]}</p>
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-60"
      >
        <li className={"my-1"}>
          <Link href={ROUTING.profile} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        {user.role === "admin" && (
          <li className={"my-1 btn-sm"}>
            <Link href={ROUTING.admin} className="justify-between">
              Admin Panel
              <span className="badge">New</span>
            </Link>
          </li>
        )}
        <li className={"my-1"}>
          <button onClick={() => logout()} className={"btn btn-sm btn-error"}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AuthStatus;
