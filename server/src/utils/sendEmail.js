const { Resend } = require("resend");

let resend;

const getResendClient = () => {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

const sendEmail = async ({ to, subject, html }) => {
  await getResendClient().emails.send({
    from: process.env.RESEND_FROM || "E-Commerce <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
