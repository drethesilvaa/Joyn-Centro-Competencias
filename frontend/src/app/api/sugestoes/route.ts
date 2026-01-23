import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// TODO: Configure these environment variables in your .env.local file
// SMTP_HOST=smtp.your-provider.com
// SMTP_PORT=587
// SMTP_USER=your-email@domain.com
// SMTP_PASS=your-password
// SMTP_FROM=noreply@domain.com
// SMTP_TO=destination@domain.com

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, message, userEmail, userName } = body

        if (!type || !message || !userEmail || !userName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Create transporter with your SMTP configuration
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        // Email options
        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.SMTP_TO || process.env.SMTP_USER,
            subject: `Nova ${type === 'suggestion' ? 'Sugestão' : 'Feedback'} - Joyn Centro de Competências`,
            html: `
                <h2>Nova ${type === 'suggestion' ? 'Sugestão' : 'Feedback'}</h2>
                <p><strong>Tipo:</strong> ${type === 'suggestion' ? 'Sugestão' : 'Feedback'}</p>
                <p><strong>Enviado por:</strong> ${userName} (${userEmail})</p>
                <p><strong>Mensagem:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><em>Enviado através do formulário de Sugestões</em></p>
            `,
            text: `
                Nova ${type === 'suggestion' ? 'Sugestão' : 'Feedback'}
                
                Tipo: ${type === 'suggestion' ? 'Sugestão' : 'Feedback'}
                Enviado por: ${userName} (${userEmail})
                
                Mensagem:
                ${message}
                
                ---
                Enviado através do formulário de Sugestões
            `,
        }

        // Send email
        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
