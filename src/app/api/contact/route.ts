import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    // Honeypot anti-spam
    const botField = (form.get('phone') || '').toString();
    if (botField) {
      return NextResponse.redirect(new URL('/', req.url), {status: 303});
    }

    const name = (form.get('name') || '').toString().trim();
    const email = (form.get('email') || '').toString().trim();
    const company = (form.get('company') || '').toString().trim();
    const message = (form.get('message') || '').toString().trim();
    const consent = form.get('consent');

  if (!name || !email || !message || consent !== 'on') {
      const url = new URL(req.headers.get('referer') || '/', req.url);
      url.searchParams.set('error', '1');
      return NextResponse.redirect(url, {status: 303});
    }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_FROM = process.env.RESEND_FROM;
  const RESEND_TO = process.env.RESEND_TO;

    if (!RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json({error: 'Email service not configured'}, {status: 500});
    }

    const subject = `New contact form from Dz node website -  ${name}`;
    const text = [
      `Name: ${name}`,
      `email: ${email}`,
      company ? `Company: ${company}` : '',
      '',
      'Message:',
      message
    ].filter(Boolean).join('\n');

  // Prefer a display name in From if not already provided in env
  const fromHeader = RESEND_FROM && RESEND_FROM.includes('<') ? RESEND_FROM : (RESEND_FROM ? `Dz node <${RESEND_FROM}>` : undefined);

  const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
    from: fromHeader,
        to: [RESEND_TO],
        subject,
    text,
    // Help recipients reply directly to the submitter
    reply_to: email
      })
    });

    if (!sendRes.ok) {
      const err = await safeJson(sendRes);
      console.error('Resend API error:', err);
      const url = new URL(req.headers.get('referer') || '/', req.url);
      url.searchParams.set('error', '1');
      return NextResponse.redirect(url, {status: 303});
    }

    const url = new URL(req.headers.get('referer') || '/', req.url);
    url.searchParams.set('success', '1');
    return NextResponse.redirect(url, {status: 303});
  } catch (e) {
    console.error('Contact form error:', e);
    const url = new URL('/', req.url);
    url.searchParams.set('error', '1');
    return NextResponse.redirect(url, {status: 303});
  }
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return {status: res.status, statusText: res.statusText};
  }
}
