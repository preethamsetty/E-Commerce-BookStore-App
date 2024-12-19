import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{ 
        user: process.env.SECRET_MAIL_ID,
        pass: process.env.SECRET_MAIL_PASSWORD,
    },
    tls:{
        rejectUnauthorized: false 
    }
})

const sendResetEmail =async(email:string,resetToken:string)=>{
    const resetLink = `http://localhost:${ process.env.APP_PORT}/api/v1/users/resetpassword?resetToken=${resetToken}`;
    const mailOptions = {
        from: process.env.SECRET_MAIL_ID,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <h3>You requested a password reset</h3>
          <p>Please click the link below to reset your password:</p>
          <p>${resetLink}</p>   
          <p>If you did not request this, please ignore this email.</p>
        `,
       
      };

      try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Reset email sent' };
      } catch (error) {
        console.error('Error sending reset email:', error);
        throw new Error('Error sending email');
      }
};

export { sendResetEmail };