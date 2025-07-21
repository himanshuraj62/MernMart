const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Hello ${name},</h2>
        <p style="font-size: 16px; color: #555;">
          Thank you for registering with <strong>MernMart</strong>! We're excited to have you on board.
        </p>
        <p style="font-size: 16px; color: #555;">
          Please click the button below to verify your email address and complete your registration:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" 
             style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color: #007BFF; 
                    text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
        </div>
        <p style="font-size: 14px; color: #999;">
          If you didn't request this, you can safely ignore this email.
        </p>
        <hr style="margin-top: 40px;">
        <p style="font-size: 12px; color: #ccc; text-align: center;">
          &copy; ${new Date().getFullYear()} MernMart. All rights reserved.
        </p>
      </div>
    </div>
  `;
};

export default verifyEmailTemplate;
