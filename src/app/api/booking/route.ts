import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: { user: true },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(
    bookings.map((b) => ({
      ...b,
      userEmail: b.user.email,
    }))
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { vehicle, serviceType, date, notes } = await req.json();
  const booking = await prisma.booking.create({
    data: {
      vehicle,
      serviceType,
      date: new Date(date),
      notes,
      userId: session.user.id,
    },
  });

  return NextResponse.json(booking, { status: 201 });
}
