"use client";
import Button from "@/components/shared/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session.user.role;
      router.push(
        role === "ADMIN"
          ? "/dashboard/admin"
          : role === "OWNER"
          ? "/dashboard/owner"
          : role === "MONTIR"
          ? "/dashboard/montir"
          : "/my-booking"
      );
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <input
        type="text"
        className="border px-4 py-2 w-full"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border px-4 py-2 w-full"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Login" onClick={handleLogin} />
    </div>
  );
}
