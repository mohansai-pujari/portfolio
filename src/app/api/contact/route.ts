import { NextResponse } from "next/server";
import { personal } from "@/data/portfolio";
import { asNonEmptyString } from "@/lib/safe-data";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (body.company) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Message should be at least 10 characters." },
      { status: 400 },
    );
  }

  const recipientEmail = asNonEmptyString(personal?.email);
  if (!recipientEmail) {
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio message from ${name}`,
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = (await response.json()) as { success?: string };

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { error: "Unable to send your message. Please try email directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send your message. Please try email directly." },
      { status: 502 },
    );
  }
}
