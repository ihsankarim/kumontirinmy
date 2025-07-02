"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Spin } from "antd";

export default function Navbar() {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  return (
    <nav className="bg-white shadow px-6 py-4 mb-6 flex justify-between">
      <Link href="/" className="font-bold text-lg text-blue-600">
        Kumontirinmy
      </Link>
      <div className="space-x-4">
        {status === "loading" ? (
          <Spin />
        ) : session ? (
          <>
            <span className="text-sm text-gray-700">
              {session.user.email} ({role})
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
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
