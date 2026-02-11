const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationEmail = async (to, token) => {
  // In production, this points to your real domain (e.g., app.esgplatform.com)
  const url = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  const msg = {
    to: to,
    from: process.env.EMAIL_FROM, // Must be a verified sender in SendGrid
    subject: 'Action Required: Verify your ESG Platform Account',
    text: `Verify your account here: ${url}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e0e0e0; padding: 20px;">
        <h2 style="color: #2D5A27;">ESG Reporting Platform</h2>
        <p>Hello,</p>
        <p>Thank you for joining our automated ESG reporting initiative. To begin generating your GRI or SASB reports, please verify your email.</p>
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #2D5A27; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Verify Email Address
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">If you did not create this account, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Production email sent to ${to}`);
  } catch (error) {
    console.error('❌ SendGrid Error:', error.response ? error.response.body : error);
    throw new Error('Email service unavailable');
  }
};