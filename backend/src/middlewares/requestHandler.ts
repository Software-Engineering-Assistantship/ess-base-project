import { Request, Response } from 'express';

const requestHandler = (req: Request, res: Response) => {
  if (res.headersSent) {
    console.warn(
      'Parece que você está usando res.send() ou res.json() diretamente no controller. Isso não vai impedir seu código de funcionar, mas deixa a base de código inconsistente.\nIdealmente, use res.locals em vez disso e chame next().\nUm exemplo pode ser visto em src/controllers/UserController.ts.',
    );
    return;
  }
  if (!res.locals.status) {
    res.status(404).json({
      message: 'Rota não encontrada.',
    });
    return;
  }
  res
    .status(res.locals.status)
    .json({ data: res.locals.data, message: res.locals.message });
};

export default requestHandler;
