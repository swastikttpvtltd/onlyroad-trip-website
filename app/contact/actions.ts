'use server';

import nodemailer from 'nodemailer';
import { redirect } from 'next/navigation';

function required(value: FormDataEntryValue | null, field: string) {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) throw new Error(`${field} is required`);
  return text;
}

export async function sendTripEnquiry(formData: FormData) {
  const name = required(formData.get('name'), 'Name');
  const phone = required(formData.get('phone'), 'Mobile number');
  const email = required(formData.get('email'), 'Email address');
  const destination = String(formData.get('destination') ?? '').trim();
  const travelDate = String(formData.get('travelDate') ?? '').trim();
  const travellers = String(formData.get('travellers') ?? '').trim();
  const tripType = String(formData.get('tripType') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpSecure = String(process.env.SMTP_SECURE || 'true') === 'true';
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const enquiryTo = process.env.ENQUIRY_TO_EMAIL || 'info@onlyroadtrip.com';

  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.error('Trip enquiry email is not configured. Check SMTP environment variables.');
    redirect('/contact?error=email-config');
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `Only Road Trip Website <${smtpUser}>`,
      to: enquiryTo,
      replyTo: email,
      subject: `New Trip Enquiry – ${destination || 'Custom Trip'} – ${name}`,
      text: [
        'NEW TRIP ENQUIRY',
        '',
        `Name: ${name}`,
        `Mobile: ${phone}`,
        `Email: ${email}`,
        `Destination: ${destination || 'Not specified'}`,
        `Travel Date: ${travelDate || 'Not specified'}`,
        `Travellers: ${travellers || 'Not specified'}`,
        `Trip Type: ${tripType || 'Not specified'}`,
        '',
        'Client Requirements:',
        message || 'No additional description provided.',
      ].join('\n'),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:700px;margin:0 auto;color:#0f172a">
          <div style="background:#1e40af;color:#fff;padding:24px 28px;border-radius:14px 14px 0 0">
            <h1 style="margin:0;font-size:22px">New Trip Enquiry</h1>
            <p style="margin:8px 0 0;color:#dbeafe">Only Road Trip website enquiry</p>
          </div>
          <div style="border:1px solid #e2e8f0;border-top:0;padding:28px;border-radius:0 0 14px 14px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:9px 0;font-weight:700;width:170px">Name</td><td style="padding:9px 0">${name}</td></tr>
              <tr><td style="padding:9px 0;font-weight:700">Mobile</td><td style="padding:9px 0">${phone}</td></tr>
              <tr><td style="padding:9px 0;font-weight:700">Email</td><td style="padding:9px 0">${email}</td></tr>
              <tr><td style="padding:9px 0;font-weight:700">Destination</td><td style="padding:9px 0">${destination || 'Not specified'}</td></tr>
              <tr><td style="padding:9px 0;font-weight:700">Travel Date</td><td style="padding:9px 0">${travelDate || 'Not specified'}</td></tr>
              <tr><td style="padding:9px 0;font-weight:700">Travellers</td><td style="padding:9px 0">${travellers || 'Not specified'}</td></tr>
              <tr><td style="padding:9px 0;font-weight:700">Trip Type</td><td style="padding:9px 0">${tripType || 'Not specified'}</td></tr>
            </table>
            <div style="margin-top:24px;padding:18px;background:#f8fafc;border-radius:12px">
              <strong>Client Requirements</strong>
              <p style="margin:10px 0 0;line-height:1.7;white-space:pre-wrap">${message || 'No additional description provided.'}</p>
            </div>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error('Trip enquiry email failed:', error);
    redirect('/contact?error=email-send');
  }

  redirect('/contact?submitted=1');
}
