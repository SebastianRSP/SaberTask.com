import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';

export async function POST(request: Request) {
  const { name, email, company, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

  try {
    await client.sendEmail({
      From: process.env.CONTACT_FROM_EMAIL!,
      To: process.env.CONTACT_TO_EMAIL!,
      ReplyTo: email,
      Subject: `New contact form submission from ${name}`,
      TextBody: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : '',
        phone ? `Phone: ${phone}` : '',
        '',
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Postmark error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
