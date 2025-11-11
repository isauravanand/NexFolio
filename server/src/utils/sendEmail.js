const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail(to, verifyCode) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // use a domain or @resend.dev
            to: to,
            subject: "Verify your email address",
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Verify Your Email</h2>
          <p>Hi there 👋,</p>
          <p>Use the verification code below to complete your registration:</p>
          <h1 style="background: #f4f4f4; display: inline-block; padding: 10px 20px; border-radius: 8px;">${verifyCode}</h1>
          <p>This code will expire in <strong>10 minutes</strong>.</p>
          <p>If you didn’t request this, you can safely ignore this email.</p>
          <br/>
          <p>— Your App Team</p>
        </div>
      `,
        });

        if (error) {
            console.error("Error sending email:", error);
            return false;
        }

        console.log("Verification email sent:", data);
        return true;
    } catch (err) {
        console.error("Email sending failed:", err);
        return false;
    }
}

module.exports = sendVerificationEmail;
