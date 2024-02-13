export default class PromocoesEntity {
    id: string;
    nome: string;
    valor: Number;
    tipo: string;
    validade: string;
  
    constructor(data: {
        nome: string;
        valor: Number;
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