import { requireRole } from "@/lib/auth";
import React from "react";

export default async function OwnerDashboard() {
  requireRole(["OWNER"]);
  return (
    <div>
      <h1 className="text-2xl">Owner Dashboard</h1>
    </div>
  );
}
