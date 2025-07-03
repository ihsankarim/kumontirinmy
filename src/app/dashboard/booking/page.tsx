"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { any } from "zod/v4";

export default function BookingPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/booking");
      const data = await res.json();
      setBookings(data);
    }
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/booking/${id}`, {
      method: "DELETE",
    });
    setBookings((prev) => prev.filter((b: any) => b.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Booking</h1>
        <Link
          href="/dashboard/booking/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah Booking
        </Link>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Kendaraan</th>
            <th className="border px-4 py-2 text-left">Jenis Service</th>
            <th className="border px-4 py-2 text-left">Tanggal</th>
            <th className="border px-4 py-2 text-left">Catatan</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking: any) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.vehicle}</td>
              <td className="border px-4 py-2">{booking.serviceType}</td>
              <td className="border px-4 py-2">{booking.date}</td>
              <td className="border px-4 py-2">{booking.notes}</td>
              <td className="border px-4 py-2">{booking.status}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link
                  href={`/dashboard/booking/edit/${booking.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
