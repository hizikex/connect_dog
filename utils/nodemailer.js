import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hizikex@gmail.com',
        pass: 'yynaqzdselffzpmt',
      },
    });

    let mailOptions = {
      from: {
        name: 'DOG CONNECT',
        address: 'dog_connect@gmail.com',
      },
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email", error.message);
  }
};

export default sendEmail;
