import { Resend } from 'resend';
import dotenv from "dotenv";
dotenv.config();

// ✅ Fix this check
if (!process.env.RESEND_API) {
    console.log("RESEND_API is missing in your .env file!");
}

// ✅ Add this line (you forgot to initialize)
const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'MernMart <onboarding@resend.dev>',
            to: 'himanshurajpoot2233@gmail.com',
            subject,
            html,
        });
      

        if (error) {
            console.error({ error }); // log the error if any
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

export default sendEmail;
