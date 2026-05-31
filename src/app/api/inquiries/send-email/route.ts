import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Strict email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email) && email.length > 5 && email.length < 254;
  return isValid;
};

// Spam detection - check for suspicious patterns
const isSpamEmail = (email: string): boolean => {
  const suspiciousPatterns = [
    /^[0-9]+@/,
    /test[0-9]*@/i,
    /temp@/i,
    /spam@/i,
    /fake@/i,
    /dummy@/i,
    /example@example\.com/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(email));
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      company,
      country,
      phone,
      fish,
      quantity,
      message,
    } = body;

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for spam patterns
    if (isSpamEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate other fields
    if (!name || !company || !country || !phone || !fish) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'noreply@export.siripku.id',
      to: 'export.siripku@gmail.com',
      subject: `New Export Inquiry from ${name} (${company})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">New Export Inquiry</h2>
          
          <div style="background-color: #f0f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Inquiry Details</h3>
            
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone/WhatsApp:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong>Country:</strong> ${country}</p>
            <p style="margin: 10px 0;"><strong>Fish Interest:</strong> ${fish}</p>
            ${quantity ? `<p style="margin: 10px 0;"><strong>Est. Quantity:</strong> ${quantity}</p>` : ''}
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="color: #666; line-height: 1.6;">${message || '(No message provided)'}</p>
          </div>

          <div style="background-color: #06b6d4; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0;">
              <strong>💬 Reply to Inquiry</strong><br>
              <a href="mailto:${email}" style="color: white; text-decoration: underline;">Send Email Reply</a> | 
              <a href="https://wa.me/${phone?.replace(/[^0-9+]/g, '')}" style="color: white; text-decoration: underline;">WhatsApp Reply</a>
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">This inquiry was submitted through Siripku Export website</p>
        </div>
      `,
    });

    if (adminEmailResult.error) {
      console.error('Error sending admin email:', adminEmailResult.error);
      return NextResponse.json(
        { error: 'Failed to send inquiry' },
        { status: 500 }
      );
    }

    // Confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'noreply@export.siripku.id',
      to: email,
      subject: 'Your Inquiry Has Been Received - Siripku Export',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">Thank You for Your Inquiry!</h2>
          
          <p style="color: #666; line-height: 1.6;">Hello ${name},</p>
          
          <p style="color: #666; line-height: 1.6;">
            We have received your inquiry for ornamental fish export. Our export team will review your requirements and contact you within <strong>2 hours</strong> with:
          </p>

          <ul style="color: #666; line-height: 1.8;">
            <li>Species availability and quality information</li>
            <li>Detailed pricing and volume discounts</li>
            <li>Shipping options and delivery timelines</li>
            <li>Export documentation requirements</li>
          </ul>

          <div style="background-color: #f0f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Inquiry Summary</h3>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 10px 0;"><strong>Country:</strong> ${country}</p>
            <p style="margin: 10px 0;"><strong>Fish Interest:</strong> ${fish}</p>
            ${quantity ? `<p style="margin: 10px 0;"><strong>Quantity:</strong> ${quantity}</p>` : ''}
          </div>

          <div style="background-color: #06b6d4; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="margin-top: 0;">Quick Contact Options</h3>
            <p style="margin: 10px 0;">
              <strong>📱 WhatsApp:</strong> <a href="https://wa.me/6289652456206" style="color: white; text-decoration: underline;">+62 896 5245 6206</a>
            </p>
            <p style="margin: 10px 0;">
              <strong>📧 Email:</strong> <a href="mailto:export.siripku@gmail.com" style="color: white; text-decoration: underline;">export.siripku@gmail.com</a>
            </p>
          </div>

          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
            Siripku Export - Premium Ornamental Fish from Indonesia<br>
            export.siripku.id
          </p>
        </div>
      `,
    });

    if (userEmailResult.error) {
      console.error('Error sending user confirmation email:', userEmailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry sent successfully',
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
