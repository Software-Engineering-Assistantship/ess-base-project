interface ProductProps {
    nome: string;
    id: string;
    quantidade: number;
    preco: number;
    Local: string;
}

export default class Product {
    private props: ProductProps;

    constructor(nome:string, 
        id:string, 
        quantidade:number, 
        preco:number, 
        Local:string) {

        this.props.nome = nome;
        this.props.id = id;
        this.props.quantidade = quantidade;
        this.props.preco = preco;
        this.props.Local = Local;
    }

    set setQuantidade(quantidade:number) {
        this.props.quantidade = quantidade;
    }

    public removeQuantidade(quantidade:number) {
        if (this.props.quantidade >= quantidade)
            this.props.quantidade -= quantidade;

        else
            throw new Error('Quantidade insuficiente');
    }

    get nome() {
        return this.props.nome;
    }

    get id() {
        return this.props.id;
    }

    get quantidade() {
        return this.props.quantidade;
    }

    get preco() {
        return this.props.preco;
    }

    get Local() {
        return this.props.Local;
    }
}   