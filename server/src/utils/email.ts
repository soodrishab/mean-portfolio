import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  // Skip if SMTP is not configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email skipped - SMTP not configured');
    console.log('Would have sent:', options.subject, 'to', options.to);
    return;
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: options.from || `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html
  });

  console.log('Email sent successfully to:', options.to);
};

export default sendEmail;
