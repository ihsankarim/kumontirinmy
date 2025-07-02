import { requireRole } from "@/lib/auth";

export default async function UserBookingPage() {
  await requireRole(["USER"]);
  return <h1>Halaman Booking Pengguna</h1>;
}
