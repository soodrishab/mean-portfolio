import { Resend } from 'resend';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

// Create Resend client lazily to avoid crash if API key is missing
let resendClient: Resend | null = null;

const getResendClient = (): Resend | null => {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const client = getResendClient();

  // Skip if Resend is not configured
  if (!client) {
    console.log('📧 Email skipped - RESEND_API_KEY not configured');
    console.log('   Would have sent:', options.subject, 'to', options.to);
    return;
  }

  console.log('📧 Attempting to send email via Resend...');
  console.log('   To:', options.to);
  console.log('   Subject:', options.subject);

  try {
    const { data, error } = await client.emails.send({
      from: options.from || 'Portfolio Contact <onboarding@resend.dev>',
      to: options.to,
      subject: options.subject,
      html: options.html
    });

    if (error) {
      console.error('❌ Email send failed:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Email sent successfully!');
    console.log('   Email ID:', data?.id);
  } catch (error: any) {
    console.error('❌ Email send failed:', error.message);
    throw error;
  }
};

export default sendEmail;
