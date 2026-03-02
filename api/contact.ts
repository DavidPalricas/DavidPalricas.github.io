// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// A instância é criada fora do handler para aproveitar cache em cold starts menores
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Rejeita qualquer método que não seja POST imediatamente
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Validação estrita do payload para evitar consumo desnecessário da quota da API
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required parameters: name, email, or message.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.PORTFOLIO_EMAIL as string, 
      to: process.env.DESTINATION_EMAIL as string,
      subject: `[David Palricas Portfolio] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}