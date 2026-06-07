import dotenv from "dotenv";
import nodemailer from "nodemailer"
import  pkg   from "winston";
const { info  } = pkg;

dotenv.config();

const appUser = process.env.EMAIL_USER;
const appPass = process.env.EMAIL_PASS;
// console.log(appUser,appPass)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure:true,
    debug:true,
    logger:true,
    auth:{
        user:appUser,
        pass:appPass
    }
})
export const sendMail = async (to ,subject,text,html) =>{
try {
    transporter.sendMail({
        from:`TOP Coder ${appUser}`,
        to:to,
        subject:subject,
        text:text,
        html:html
    })
    console.log("Email Sent" , info.messageid);
    return info
} catch (error) {
    console.error("Email error:", error);
        throw error;
}

}

transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
