'use client'
import { requireRole } from "@/lib/auth";
import React from "react";

export default async function DashboardPage() {
  await requireRole(["ADMIN"]);
  return (
    <div>
      <h1 className="text-2xl">Admin Dashboard</h1>;
    </div>
  );
}
