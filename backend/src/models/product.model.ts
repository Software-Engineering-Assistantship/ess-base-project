import fs from 'fs';

export default class ProductModel{
    private _props = {
        nome: '',
        id: '',
        quantidade: 0,
        preco: 0,
        Local: ''
    }

    constructor(nome: string, id: string, quantidade: number, preco: number, Local: string) {

        this._props.nome = nome;
        this._props.id = id;
        this._props.quantidade = quantidade;
        this._props.preco = preco;
        this._props.Local = Local;
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