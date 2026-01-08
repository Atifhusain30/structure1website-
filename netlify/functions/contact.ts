import { Handler } from '@netlify/functions';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const NOTIFICATION_EMAILS = [
  'atifhusain9@outlook.com',
  'samuel.c.w.allison@gmail.com'
];

const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data: ContactFormData = JSON.parse(event.body || '{}');
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Format the email content
    const emailContent = `
New Lead from Structure1 Construction Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
-------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

SERVICE INTEREST
----------------
${data.service || 'Not specified'}

PROJECT DESCRIPTION
-------------------
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This lead was submitted via the Structure1 Construction website contact form.
    `.trim();

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      // Send emails using Resend
      const sendPromises = NOTIFICATION_EMAILS.map(async (toEmail) => {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Structure1 Construction <leads@structure1.com>',
            to: toEmail,
            subject: `🏗️ New Lead: ${data.name} - ${data.service || 'General Inquiry'}`,
            text: emailContent,
            reply_to: data.email,
          }),
        });
        
        if (!response.ok) {
          const error = await response.text();
          console.error(`Failed to send to ${toEmail}:`, error);
          throw new Error(`Failed to send email to ${toEmail}`);
        }
        
        return response.json();
      });

      await Promise.all(sendPromises);
      
      console.log('Emails sent successfully to:', NOTIFICATION_EMAILS.join(', '));
    } else {
      // Log the lead if no email service is configured
      console.log('═══════════════════════════════════════════');
      console.log('NEW LEAD RECEIVED (Email service not configured)');
      console.log('═══════════════════════════════════════════');
      console.log(emailContent);
      console.log('═══════════════════════════════════════════');
      console.log('To enable email notifications, set RESEND_API_KEY environment variable');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        notificationEmails: NOTIFICATION_EMAILS 
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process form submission' }),
    };
  }
};

export { handler };

