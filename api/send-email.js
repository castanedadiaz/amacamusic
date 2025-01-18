export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const body = await req.json(); // Read the request body as JSON
      // Example: Send an email
      const email = body.email;
      const message = body.message;
      // In real world, use a library to send email like nodemailer
      // but this is a simplication.
      await sendEmail(email,message)
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async function sendEmail(email, message){
      console.log('email sent to: '+email+' message: '+message);
      // in a real project here you would send the email
  }