"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { date } from "zod/v4";

export default function CrateBookingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    vehicle: "",
    serviceType: "",
    date: "",
    notes: "",
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        date: new Date(form.date),
      }),
    });

    if (res.ok) {
      router.push("/dashboard/booking");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Buat Booking</h1>
      <input
        className="border py-2 px-4 w-full"
        placeholder="Nama Kendaraan"
        value={form.vehicle}
        onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
      />
      <input
        type="text"
        placeholder="Jenis Service"
        value={form.serviceType}
        className="border py-2 px-4 w-full"
        onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
      />
      <input
        placeholder="Tanggal"
        value={form.date}
        type="date"
        className="border py-2 px-4 w-full"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Catatan"
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="border py-2 px-4 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Simpan
      </button>
    </div>
  );
}
