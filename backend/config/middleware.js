const jwt = require('jsonwebtoken');

// Função para gerar um token JWT
const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
};

// Middleware para verificar o token em cada requisição
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, 'secreto', (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.userId = decodedToken.userId;
        next();
    });
};

// Rota de login
const user_login = async (req, res) => {
    // Verificação de credenciais aqui

    // Se o usuário for autenticado com sucesso
    const token = generateToken(user);
    return res.json({ token });
};

module.exports = {
    user_login,
    verifyToken
};