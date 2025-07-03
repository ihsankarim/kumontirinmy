"use client";

import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { useEffect, useState } from "react";

const prisma = new PrismaClient();

export default function UserManagement() {
  const [users, setUsers] = useState<PrismaUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kelola Pengguna</h1>
      <UserTable users={users} />
    </div>
  );
}

function UserTable({ users }: { users: PrismaUser[] }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-left">Email</th>
          <th className="border px-4 py-2 text-left">Role</th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter((user) => user.role !== "ADMIN")
          .map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 capitalize">{user.role}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
