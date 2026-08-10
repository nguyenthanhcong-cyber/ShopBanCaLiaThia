const nodemailer = require('nodemailer');

let transporter = null;

async function getTransporter() {
  if (transporter) return transporter;

  // Dùng Ethereal Email để test (tự động tạo account tạm)
  // Thay bằng SMTP thật trong production: MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS
  if (process.env.MAIL_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  } else {
    // Ethereal mock account cho development
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('📧 [Mail] Using Ethereal test account:', testAccount.user);
  }

  return transporter;
}

async function sendResetPasswordEmail(toEmail, resetUrl) {
  try {
    const transport = await getTransporter();
    const info = await transport.sendMail({
      from: process.env.MAIL_FROM || '"Cá Liền Thia 🐠" <no-reply@calianthia.vn>',
      to: toEmail,
      subject: '[Cá Liền Thia] Đặt lại mật khẩu của bạn',
      html: `
        <div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;background:#f4fbff;border-radius:16px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#0c7c7a,#1aa9a7);padding:28px 32px;text-align:center">
            <h1 style="color:white;margin:0;font-size:1.6rem">🐠 Cá Liền Thia</h1>
          </div>
          <div style="padding:32px">
            <h2 style="color:#102a2d;margin-top:0">Đặt lại mật khẩu</h2>
            <p style="color:#5f7780;line-height:1.7">Chúng tôi nhận được yêu cầu đặt lại mật khẩu của bạn. Nhấn vào nút bên dưới để tiếp tục:</p>
            <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#0c7c7a,#1aa9a7);color:white;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;margin:16px 0">
              Đặt lại mật khẩu
            </a>
            <p style="color:#5f7780;font-size:0.85rem;margin-top:24px">Liên kết này sẽ hết hạn sau <strong>30 phút</strong>. Nếu bạn không yêu cầu đặt lại, hãy bỏ qua email này.</p>
            <hr style="border:none;border-top:1px solid #dfeef2;margin:24px 0"/>
            <p style="color:#aaa;font-size:0.75rem;text-align:center">Cá Liền Thia – Cá cảnh đẹp, chất lượng cao</p>
          </div>
        </div>
      `
    });

    console.log('📧 [Mail] Reset email sent:', nodemailer.getTestMessageUrl(info) || info.messageId);
    return info;
  } catch (err) {
    console.error('[Mail] Failed to send reset email:', err.message);
    throw err;
  }
}

module.exports = { sendResetPasswordEmail };
