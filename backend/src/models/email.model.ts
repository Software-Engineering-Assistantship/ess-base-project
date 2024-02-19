import UserEntity from "../entities/user.entity";
import BaseEntity from "../entities/base.entity";
// import { OrderEntity } from './OrderEntity';
// import { OrderReceiptEntity } from './OrderReceiptEntity';

export class EmailModel {
    id: string;
    remetente: string;
    destinatario: string;
    assunto: string;
    corpoEmail: string;
    comprovante: string | null;
    // pedido: donoPedido;
    // reciboPedido: NumeroDoPedido;
    //user: UserEntity;
    isSpam?: boolean;

    constructor(data: { 
      id: string; 
      remetente: string; 
      destinatario: string; 
      assunto: string; 
      corpoEmail: string;
      comprovante: string | null;
      // pedido: donoPedido;
      // reciboPedido: NumeroDoPedido;
      // user: UserEntity;
      isSpam?: boolean;
    }) {
        this.id = data.id;
        this.remetente = data.remetente;
        this.destinatario = data.destinatario;
        this.assunto = data.assunto;
        this.corpoEmail = data.corpoEmail;
        this.comprovante = data.comprovante;
        // this.pedido = data.pedido;
        // this.reciboPedido = data.reciboPedido;
        // this.user = data.user;
        this.isSpam = data.isSpam ?? false;
    }

    updateField(field: string, value: string) {
      switch (field) {
          case 'remetente':
              this.remetente = value;
              break;
          case 'destinatario':
              this.destinatario = value;
              break;
          case 'assunto':
              this.assunto = value;
              break;
          case 'corpoEmail':
              this.corpoEmail = value;
              break;
          default:
              throw new Error('Campo inválido');
      }
  }
}

export default EmailModel;
