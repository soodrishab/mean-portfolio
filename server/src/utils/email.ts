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
    console.log('📧 Email skipped - SMTP not configured');
    console.log('   SMTP_USER set:', !!process.env.SMTP_USER);
    console.log('   SMTP_PASS set:', !!process.env.SMTP_PASS);
    console.log('   Would have sent:', options.subject, 'to', options.to);
    return;
  }

  console.log('📧 Attempting to send email...');
  console.log('   From:', process.env.SMTP_USER);
  console.log('   To:', options.to);
  console.log('   Subject:', options.subject);

  const transporter = createTransporter();

  try {
    // Verify SMTP connection first
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    const result = await transporter.sendMail({
      from: options.from || `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html
    });

    console.log('✅ Email sent successfully to:', options.to);
    console.log('   Message ID:', result.messageId);
  } catch (error: any) {
    console.error('❌ Email send failed:', error.message);
    console.error('   Error code:', error.code);
    console.error('   Full error:', JSON.stringify(error, null, 2));
    throw error;
  }
};

export default sendEmail;
