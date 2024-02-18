import fs from 'fs';

interface ProductProps {
    nome: string;
    id: string;
    quantidade: number;
    preco: number;
    Local: string;
}


export default class ProductModel{
    private _props: ProductProps;

    constructor(props: ProductProps) {

        this._props.nome = props.nome;
        this._props.id = props.id;
        this._props.quantidade = props.quantidade;
        this._props.preco = props.preco;
        this._props.Local = props.Local;
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

    get props() {
        return this._props;
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