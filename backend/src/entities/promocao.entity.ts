export default class PromocaoEntity {
    id: string;
    nome: string;
    valor: string;
    tipo: string;
    validade: string;
  
    constructor(data: {
        nome: string;
        valor: string;
        tipo: string;
        validade: string;
    }) {
      this.id = data.nome;
      this.nome = data.nome;
      this.valor = data.valor;
      this.tipo = data.tipo;
      this.validade = data.validade;
    }
}