import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from '../middleware/passport';
import ClientService from '../services/client.service';
import HotelierService from '../services/hotelier.service';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';

const passwordValidation = z.string().min(7, { message: 'A senha deve ter mais de 6 dígitos' });
const resetPasswordSchema = z.object({
    newPassword: passwordValidation,
    token: z.string(),
});

class AuthController {
    public router: Router;
    private clientService: ClientService;
    private hotelierService: HotelierService;

    constructor() {
        this.router = Router();
        this.clientService = new ClientService();
        this.hotelierService = new HotelierService();
        this.setupRoutes();
    }

    private setupRoutes() {
        this.router.post('/client/login', this.clientLogin.bind(this));
        this.router.post('/client/recover-password', this.clientRecoverPassword.bind(this));
        this.router.post(
            '/client/reset-password',
            validateData(resetPasswordSchema),
            this.clientResetPassword.bind(this),
        );
        this.router.post('/hotelier/login', this.hotelierLogin.bind(this));
        this.router.post('/hotelier/recover-password', this.hotelierRecoverPassword.bind(this));
        this.router.post(
            '/hotelier/reset-password',
            validateData(resetPasswordSchema),
            this.hotelierResetPassword.bind(this),
        );
    }

    private async clientLogin(req: Request, res: Response, next: any) {
        passport.authenticate('client-local', { session: false }, (err, client, info) => {
            if (err) {
                return next(err);
            }
            if (!client) {
                return res.status(400).json({ message: info.message });
            }
            const token = jwt.sign({ id: client.id, type: 'client' }, process.env.JWT_SECRET!, {
                expiresIn: '24h',
            });
            return res.json({ token });
        })(req, res, next);
    }

    private async hotelierLogin(req: Request, res: Response, next: any) {
        passport.authenticate('hotelier-local', { session: false }, (err, hotelier, info) => {
            if (err) {
                return next(err);
            }
            if (!hotelier) {
                return res.status(400).json({ message: info.message });
            }
            const token = jwt.sign({ id: hotelier.id, type: 'hotelier' }, process.env.JWT_SECRET!, {
                expiresIn: '24h',
            });
            return res.json({ token });
        })(req, res, next);
    }

    private async clientRecoverPassword(req: Request, res: Response) {
        const { email } = req.body;
        try {
            await this.clientService.generatePasswordResetToken(email);
            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    private async hotelierRecoverPassword(req: Request, res: Response) {
        const { email } = req.body;
        try {
            await this.hotelierService.generatePasswordResetToken(email);
            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    private async clientResetPassword(req: Request, res: Response) {
        const { token, newPassword } = req.body;
        try {
            await this.clientService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password has been reset' });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    private async hotelierResetPassword(req: Request, res: Response) {
        const { token, newPassword } = req.body;
        try {
            await this.hotelierService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password has been reset' });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}

export default new AuthController().router;
