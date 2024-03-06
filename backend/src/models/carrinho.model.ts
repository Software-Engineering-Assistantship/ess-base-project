export default class CarrinhoModel {

    id: string; // o mesmo id do usuário
    id_produtos: string[];
    quantidade: number;
    data_criacao: Date;
    data_atualizacao: Date;

    constructor(data: {
        id: string,
        id_produtos: string[],
        quantidade: number,
        data_criacao: Date,
        data_atualizacao: Date
    }) {
        this.id = data.id;
        this.id_produtos = data.id_produtos;
        this.quantidade = data.quantidade;
        this.data_criacao = data.data_criacao;
        this.data_atualizacao = data.data_criacao;
    }

    public isProductInCarrinho(id: string): boolean {
        return this.id_produtos.includes(id);
    }

    public addProductToCarrinho(id: string, valor: number): void {
        this.id_produtos.push(id);
        this.quantidade++;
    }

    public removeProductFromCarrinho(id: string): void {
        this.id_produtos = this.id_produtos.filter((item) => item !== id);
        this.quantidade--;
    }

    get getId() {
        return this.id;
    }

    get getIdProdutos() {
        return this.id_produtos;
    }
}