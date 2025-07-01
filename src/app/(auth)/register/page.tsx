'use client'
import Button from "@/components/shared/Button";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", role: "USER" });

  const handleSubmit = async () => {
    const hashed = await bcrypt.hash(form.password, 10);
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ ...form, password: hashed }),
    });
    router.push("/login");
  };
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
