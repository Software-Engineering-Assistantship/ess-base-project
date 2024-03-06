import { Router, Request, Response } from 'express';
import PromocaoService from '../services/promocao.service'; // Importe o serviço de promoção
import { SuccessResult } from '../utils/result'; // Importe o objeto de resultado de sucesso, se necessário
import PromocaoEntity from '../entities/promocao.entity';

class PromocaoController {
  private prefix: string = '/promocoes';
  public router: Router;
  private promocaoService: PromocaoService;

  constructor(router: Router, promocaoService: PromocaoService) {
    this.router = router;
    this.promocaoService = promocaoService;
    this.initRoutes();
  }

  private initRoutes() {
    // Rota para criar um novo promoção
    this.router.post(`${this.prefix}/cadastro`, (req: Request, res: Response) =>
        this.createPromocao(req, res)
    );
 }

 /*   // Rota para obter todos os promoçãos
    this.router.get(`${this.prefix}`, (req: Request, res: Response) =>
        this.getAllPromocoess(req, res)
    );

    // Rota para obter um promoção pelo ID
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
        this.getPromocaoById(req, res)
    );

    // Rota para atualizar um promoção pelo ID
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updatePromocaoById(req, res)
    );
  }*/

  private async createPromocao(req: Request, res: Response) {
    // Extrai os dados do corpo da requisição
    const promocao = await this.promocaoService.createPromocao(new PromocaoEntity(req.body));

    // Retorna o novo promoção criado
    return new SuccessResult({
        msg: 'Cadastro de promoção concluído com sucesso!',
        data: promocao,
    }).handle(res);
  }

  private async getAllPromocoes(req: Request, res: Response) {
    try {
      // Chama o serviço para obter todos os promoçãos
      const promocoes = await this.promocaoService.getAllPromocoes();

      // Retorna a lista de promoçãos
      return new SuccessResult({
        msg: 'Lista de promoçãos',
        data: promocoes,
      }).handle(res);
    } catch (error) {
      // Trata erros de forma adequada
      console.error('Erro ao obter promoçãos:', error);
      return res.status(500).json({ error: 'Erro ao obter promoçãos' });
    }
  }

  private async getPromocaoById(req: Request, res: Response) {
    try {
      // Extrai o ID do parâmetro da requisição
      const promocaoId = req.params.id;

      // Chama o serviço para obter o promoção pelo ID
      const promocao = await this.promocaoService.getPromocaoById(promocaoId);

      // Verifica se o promoção foi encontrado
      if (!promocao) {
        return res.status(404).json({ error: 'promoção não encontrado' });
      }

      // Retorna o promoção encontrado
      return new SuccessResult({
        msg: 'promoção encontrado',
        data: promocao,
      }).handle(res);
    } catch (error) {
      // Trata erros de forma adequada
      console.error('Erro ao obter promoção pelo ID:', error);
      return res.status(500).json({ error: 'Erro ao obter promoção pelo ID' });
    }
  }

  private async updatepromocaoById(req: Request, res: Response) {
    try {
      // Extrai o ID do parâmetro da requisição
      const promocaoId = req.params.id;
      // Extrai os dados atualizados do corpo da requisição
      const updatedData = req.body;

      // Chama o serviço para atualizar o promoção pelo ID
      const updatedPromocao = await this.promocaoService.updatePromocaoById(promocaoId, updatedData);

      // Retorna o promoção atualizado
      return new SuccessResult({
        msg: 'promoção atualizado com sucesso',
        data: updatedPromocao,
      }).handle(res);
    } catch (error) {
      // Trata erros de forma adequada
      console.error('Erro ao atualizar promoção pelo ID:', error);
      return res.status(500).json({ error: 'Erro ao atualizar promoção pelo ID' });
    }
  }
}

export default PromocaoController;