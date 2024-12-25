import { prismaClient } from '@/lib/prismaClient';
import { sendContactEmail } from '@/lib/sendContactEmail';
import { contactFormSchema } from '@/schemas/contactFormSchema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'invalid json' }, { status: 400 });
  }

  const data = contactFormSchema.safeParse(body);

  if (!data.success) {
    return NextResponse.json({ message: 'bad request' }, { status: 400 });
  }

  const { error } = await sendContactEmail(data.data);

  if (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 },
    );
  }

  try {
    await prismaClient.contactMessage.create({
      data: data.data,
    });
  } catch {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'created' }, { status: 201 });
}
