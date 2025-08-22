import nodemailer from 'nodemailer';

export default class EmailService {
    public static async sendEmail(to: string, subject: string, html: string): Promise<void> {
        const USER_EMAIL = process.env.USER_EMAIL;
        const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: USER_EMAIL,
                pass: PASSWORD_EMAIL,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailOptions = {
            from: `"Hotel Trancinvânia 👻" <${USER_EMAIL}>`,
            to: to,
            subject: subject,
            html: html,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Erro ao enviar e-mail');
            }
        }
    }
}
