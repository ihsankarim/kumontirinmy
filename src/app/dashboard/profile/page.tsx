"use client"
import { useSession } from "next-auth/react";
import React from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Email {session?.user.email}</p>
      <p>Role {session?.user.role}</p>
    </div>
  );
}
