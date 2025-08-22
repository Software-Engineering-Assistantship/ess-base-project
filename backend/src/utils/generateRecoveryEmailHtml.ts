export function generateRecoveryEmailHtml(recoveryCode: string) {
  return `
  <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        .logo img {
            width: 100px;
            margin-bottom: 20px;
            background-color: black; /* Adding a background color to make the white text logo visible */
            border-radius: 10px; /* Optional: rounded corners for the background */
            padding: 10px; /* Optional: some padding around the logo */
        }
        .title {
            font-size: 24px;
            margin-bottom: 10px;
            color: #333;
        }
        .subtitle {
            font-size: 16px;
            margin-bottom: 20px;
            color: #666;
        }
        .code-box {
            background-color: #f4f4f9;
            border: 1px solid #ddd;
            padding: 10px;
            font-size: 18px;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }
        .footer {
            font-size: 14px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://imgur.com/uqfDFIT.png" alt="Hotel Trancivânia Logo">
        </div>
        <div class="title">Recuperação de Senha</div>
        <div class="subtitle">Use o código abaixo para redefinir sua senha:</div>
        <div class="code-box">${recoveryCode}</div>
        <div class="footer">Se você não solicitou a redefinição de senha, por favor ignore este e-mail.</div>
    </div>
</body>
</html>
  `;
}
