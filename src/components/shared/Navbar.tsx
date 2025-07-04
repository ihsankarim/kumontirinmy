// "use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Spin } from "antd";
import { useState } from "react";
import { User } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roleBasedNavLinks: Record<string, { label: string; href: string }[]> = {
    ADMIN: [{ label: "Dashboard", href: "/dashboard/admin" }],
    OWNER: [{ label: "Dashboard", href: "/dashboard/owner" }],
    MONTIR: [{ label: "Dashboard", href: "/dashboard/montir" }],
    USER: [{ label: "Dashboard", href: "/dashboard" }],
  };

  const links = role ? roleBasedNavLinks[role] || [] : [];

  return (
    <nav className="bg-white shadow px-6 py-4 mb-1 flex justify-between">
      <Link href="/" className="font-bold text-lg text-blue-600">
        Kumontirinmy
      </Link>
      <div className="flex items-center space-x-4 relative">
        {status === "loading" ? (
          <Spin />
        ) : session ? (
          <>
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 hover:text-blue-600 hover:font-medium"
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            >
              <User />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white shadow-lg border rounded z-50">
                <div className="px-4 py-2 text-sm text-gray-800 border-b">
                  {session.user.email}
                </div>
                <Link
                  href="dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-700 hover:text-blue-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
