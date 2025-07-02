import DashboardSessionProvider from "@/components/shared/DashboardSessionProvider";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardSessionProvider>
        <div className="flex">
          <Sidebar />
          <main className="ml-64 w-full p-6">{children}</main>
        </div>
      </DashboardSessionProvider>
    </>
  );
}
