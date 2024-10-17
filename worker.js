import Queue from 'bull';
import nodemailer from 'nodemailer';

const emailQueue = new Queue('email', {
  redis: { port: 6379, host: '127.0.0.1' }
});

async function sendConfirmationEmail(to, subject, text) {

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'votre.email@gmail.com', 
      pass: 'votre_mot_de_passe' 
    }
  });

  
  const mailOptions = {
    from: 'votre.email@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  await transporter.sendMail(mailOptions);
}

emailQueue.process(async (job, done) => {
  const { to, subject, text } = job.data;
  try {
    await sendConfirmationEmail(to, subject, text);
    done(); 
  } catch (err) {
    done(err); 
  }
});

export default emailQueue;