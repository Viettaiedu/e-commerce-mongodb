const sendEmail = require("./sendEmail");
const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
    <a href="${resetURL}">Reset Password</a></p>`;

  const code = `<br/> <strong>your code</strong> ${token}`;
  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello, ${name}</h4>
       ${code + "<br/>" + message}
       `,
  });
};

module.exports = sendResetPasswordEmail;
