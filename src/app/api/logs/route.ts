import { NextRequest, NextResponse } from "next/server";
import type { GolfCart } from "@prisma/client";
import prisma from "../../../../lib/db";

type LogPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  golfCart: string;
};

export async function GET(_req: NextRequest) {
  const logs = await prisma.log.findMany();
  return NextResponse.json({ data: logs }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const payload: LogPayload = await req.json();

  const { firstName, lastName, phone, golfCart } = payload;

  const log = await prisma.log.create({
    data: {
      firstName,
      lastName,
      phone,
      golfCart: golfCart === "1" ? "One" : "Two",
    },
  });

  return NextResponse.json({ log }, { status: 201 });
}
