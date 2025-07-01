import { requireRole } from "@/lib/auth";
import React from "react";

export default async function MontirDashboard() {
  await requireRole(["MONTIR"]);
  return <div className="text-2xl">MontirDashboard</div>;
}
