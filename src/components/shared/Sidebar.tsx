"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  const role = session?.user.role;

  const commonLinks = [{ label: "Profil", href: "/dashboard/profile" }];
  const roleBasedLinks: Record<string, { label: string; href: string }[]> = {
    ADMIN: [
      { label: "Dashboard", href: "/dashboard/admin" },
      { label: "Kelola Pengguna", href: "/dashboard/admin/users" },
      { label: "Kelola Booking", href: "/dashboard/admin/bookings" },
    ],
    OWNER: [
      { label: "Dashboard", href: "/dashboard/owner" },
      { label: "Jadwal Montir", href: "/dashboard/owner/schedule" },
      { label: "Laporan Booking", href: "/dashboard/owner/reports" },
    ],
    MONTIR: [
      { label: "Dashboard", href: "/dashboard/montir" },
      { label: "Tugas Hari Ini", href: "/dashboard/montir/tasks" },
      { label: "Riwayat Service", href: "/dashboard/montir/history" },
    ],
    USER: [
      { label: "Dashboard", href: "/dashboard" },
      // { label: "Buat Booking", href: "/dashboard/booking/create" },
      { label: "Riwayat booking", href: "/dashboard/booking" },
    ],
  };
  const links = [...commonLinks, ...(role ? roleBasedLinks[role] || [] : [])];
  return (
    <aside className="w-48 min-h-dvh bg-white shadow-lg p-4 space-y-2 fixed">
      {/* <h2 className="text-xl font-bold mb-4 text-blue-600">Dashboard</h2> */}
      <nav className="flex flex-col space-y-2">
        {links.map(({ label, href }) => (
          <Link
            href={href}
            key={href}
            className="text-gray-700 hover:text-blue-600 hover:font-medium"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
