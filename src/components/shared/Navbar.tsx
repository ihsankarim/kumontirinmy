"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Spin } from "antd";
import { useState } from "react";
import { User, Car, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roleBasedNavLinks: Record<string, { label: string; href: string }[]> = {
    ADMIN: [{ label: "Dashboard", href: "/dashboard/admin" }],
    OWNER: [{ label: "Dashboard", href: "/dashboard/owner" }],
    MONTIR: [{ label: "Dashboard", href: "/dashboard/montir" }],
    USER: [{ label: "Dashboard", href: "/dashboard" }],
  };

  const links = role ? roleBasedNavLinks[role] || [] : [];

  // Navigation menu items for public pages
  const publicNavItems = [
    { label: "Beranda", href: "/" },
    { label: "Layanan", href: "/#services" },
    { label: "Tentang", href: "/#about" },
    { label: "Kontak", href: "/#contact" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              Kumontirinmy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Public Navigation Items */}
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Role-based Dashboard Links */}
            {session &&
              links.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  {label}
                </Link>
              ))}

            {/* Authentication Section */}
            <div className="flex items-center space-x-4">
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {session.user?.email ||
                        session.user?.email?.split("@")[0]}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white shadow-lg border rounded-lg z-50 py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        {/* <p className="text-sm font-medium text-gray-900">
                          {session.user?.email || "User"}
                        </p> */}
                        <p className="text-sm text-gray-500">
                          {session.user?.email}
                        </p>
                        {/* {role && (
                          <p className="text-xs text-blue-600 font-medium mt-1">
                            {role}
                          </p>
                        )} */}
                      </div>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          signOut({ callbackUrl: "/login" });
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {/* Public Navigation Items for Mobile */}
            {!session &&
              publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

            {/* Role-based Dashboard Links for Mobile */}
            {session &&
              links.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

            {/* Authentication Section for Mobile */}
            <div className="pt-4 border-t border-gray-200">
              {status === "loading" ? (
                <div className="flex justify-center py-2">
                  <Spin />
                </div>
              ) : session ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user?.email || "User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session.user?.email}
                    </p>
                    {role && (
                      <p className="text-xs text-blue-600 font-medium mt-1">
                        {role}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/dashboard/profile"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
