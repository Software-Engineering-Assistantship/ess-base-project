import express, { Request, Response } from 'express';
import * as fs from 'fs';

// Configurando o servidor
const app = express();
app.use(express.json());

// Rota para login
app.post('/login', (req: Request, res: Response) => {
  const { login, password } = req.body;

  // Ler os usuários do arquivo JSON
  fs.readFile('./src/models/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }

    const users = JSON.parse(data);

    // Procurar usuário no arquivo JSON
    const user = users.find((user: any) => user.login === login);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar senha
    if (user.password !== password) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    res.json({ message: 'Login bem-sucedido.' });
  });
});


// Rota para recuperação de senha
app.post('/reset-password', (req: Request, res: Response) => {
  const { login } = req.body;

  // Ler os usuários do arquivo JSON
  const users = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf8'));

  // Procurar usuário no arquivo JSON
  const user = users.find((user: any) => user.login === login);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  res.json({ password: user.password });
});


// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
