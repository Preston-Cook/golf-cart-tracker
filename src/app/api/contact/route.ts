import prisma from '@/lib/prismaClient';
import { sendContactEmail } from '@/lib/sendContactEmail';
import { contactFormSchema } from '@/schemas/contactFormSchema';
import { NextResponse } from 'next/server';

const CONTACT_RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL;

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

  if (!CONTACT_RECIPIENT_EMAIL) {
    return NextResponse.json(
      { message: 'missing contact recipient email' },
      { status: 500 },
    );
  }

  try {
    const { error } = await sendContactEmail(data.data);
    if (error) throw error;
  } catch (err) {
    console.error('sendContactEmail failed', err);
    return NextResponse.json(
      { message: 'failed to send email' },
      { status: 500 },
    );
  }

  try {
    await prisma.contactMessage.create({
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
