"use client";
import Button from "@/components/shared/Button";
import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", role: "USER" });
  const { data: session, status } = useSession();

  const handleSubmit = async () => {
    const hashed = await bcrypt.hash(form.password, 10);
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ ...form, password: hashed }),
    });
    router.push("/login");
  };

  // auth
  useEffect(() => {
    if (status === "authenticated") {
      const role = session.user.role;
      router.push(
        role === "ADMIN"
          ? "/dashboard/admin"
          : role === "OWNER"
          ? "/dashboard/owner"
          : role === "MONTIR"
          ? "/dashboard/montir"
          : "dashboard"
      );
    }
  }, [session, status]);
  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <input
        className="border px-4 py-2 w-full"
        placeholder="Email"
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <input
        className="border px-4 py-2 w-full"
        placeholder="Password"
        type="password"
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      <select
        className="border px-4 py-2 w-full"
        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
      >
        <option value="USER">User</option>
        <option value="OWNER">Owner</option>
        <option value="MONTIR">Montir</option>
        <option value="ADMIN">Admin</option>
      </select>
      <Button text="Register" onClick={handleSubmit} />
    </div>
  );
}
