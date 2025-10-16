import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '../config/env';

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
  await transporter.sendMail({ from: EMAIL_USER, to, subject, text });
};

// TODO: Add SMS and push notification stubs
