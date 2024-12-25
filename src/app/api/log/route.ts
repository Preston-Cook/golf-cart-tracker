import { prismaClient } from '@/lib/prismaClient';
import { logFormSchema } from '@/schemas/logFormSchema';
import { GolfCart } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  let data;

  try {
    data = await prismaClient.log.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'ok', data }, { status: 200 });
}

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'invalid json' }, { status: 400 });
  }

  const data = logFormSchema.safeParse(body);

  if (!data.success) {
    return NextResponse.json({ message: 'bad request' }, { status: 400 });
  }

  const { firstName, lastName, phone, cartNum } = data.data;

  try {
    await prismaClient.log.create({
      data: {
        firstName,
        lastName,
        phone,
        golfCart: cartNum as GolfCart,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'created' }, { status: 201 });
}
