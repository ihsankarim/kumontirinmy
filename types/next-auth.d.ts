import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "ADMIN" | "USER" | "OWNER" | "MONTIR";
    };
  }
  interface User {
    id: string;
    email: string;
    role: "ADMIN" | "USER" | "OWNER" | "MONTIR";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: "ADMIN" | "USER" | "OWNER" | "MONTIR";
  }
}
