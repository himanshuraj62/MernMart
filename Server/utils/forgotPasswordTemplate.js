const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Forgot Password</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h2 {
            color: #333333;
          }
          .otp-box {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            background-color: #f0f0f0;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 5px;
            margin: 20px 0;
          }
          p {
            color: #555555;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #aaaaaa;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hello, ${name}</h2>
          <p>You recently requested to reset your password.</p>
          <p>Please use the following One-Time Password (OTP) to reset it:</p>
          <div class="otp-box">${otp}</div>
          <p>This OTP is valid for only 1 hour. If you didn’t request a password reset, you can safely ignore this email.</p>
          <p>Thanks,<br/>The MernMart Team</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} MernMart. All rights reserved.
        </div>
      </body>
    </html>
  `;
};

export default forgotPasswordTemplate;
