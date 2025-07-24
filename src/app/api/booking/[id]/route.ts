import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
  });

  if (!booking) {
    return NextResponse.json(
      {
        message: "Booking not found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(booking);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.booking.delete({ where: { id: params.id } });
  return NextResponse.json({}, { status: 204 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { serviceType, date, notes } = await req.json();
  const updatedBooking = await prisma.booking.update({
    where: { id: params.id },
    data: {
      serviceType,
      date: new Date(date),
      notes,
    },
  });

  return NextResponse.json({
    message: "Update booking success",
    data: updatedBooking,
  });
}
