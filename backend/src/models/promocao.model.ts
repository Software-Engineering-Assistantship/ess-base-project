import e from 'cors';
import fs from 'fs';
const filePathPromocoes = './src/models/promocoes.json';

class PromocaoModel {
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
    preencherCampo(campo: string, data: string) {
        switch (campo) {
            case 'nome':
                this.nome = data;
                this.id = data;
                break;
            case 'valor':
                this.valor = data;
                break;
            case 'tipo':
                this.tipo = data;
                break;
            case 'validade':
                this.validade = data;
                break;
        }
    }

    // salvarPromocao(promocaoData: PromocaoModel){
    //     fs.writeFileSync(filePathPromocoes, JSON.stringify(promocaoData));
    // }
    deletarPromocoes(){
        // // Escreve uma string vazia no arquivo
        // fs.writeFile(filePathPromocoes, '', (err) => {
        //     if (err) {
        //     console.error('Erro ao limpar o conteúdo do arquivo:', err);
        //     return;
        //     }
        //     console.log('Conteúdo do arquivo foi limpo com sucesso!');
        // });

        if (fs.existsSync(filePathPromocoes)) {
            fs.unlinkSync(filePathPromocoes);//delete promocoes.json
            const promocoesInit = new PromocaoModel({
                nome: '',
                valor: '',
                tipo: '',
                validade: ''
            });
            this.salvarPromocao(promocoesInit);
        }
    }

    salvarPromocao(promocaoData: PromocaoModel) {
        // Carrega os dados existentes do arquivo JSON, se existirem
        let promocoesJson: PromocaoModel[] = [];
        if (fs.existsSync(filePathPromocoes)) {
            const data = fs.readFileSync(filePathPromocoes, 'utf-8');
            promocoesJson = JSON.parse(data);
        }

        // Adiciona a nova promoção aos dados existentes
        promocoesJson.push(promocaoData);

        // Escreve os dados atualizados no arquivo JSON
        fs.writeFileSync(filePathPromocoes, JSON.stringify(promocoesJson));
    }

    verificarExistente(data: string): boolean {

        try {
            fs.readFileSync(filePathPromocoes, 'utf-8');
            // console.log('Conteúdo do arquivo foi lido com sucesso!');
            let promocoesJson = JSON.parse(fs.readFileSync(filePathPromocoes, 'utf-8'));

            if (promocoesJson && Array.isArray(promocoesJson)) {
                for (const promocao of promocoesJson) {
                    if (promocao.id === data) {
                        return true;
                    }
                }
                // console.log('Conteúdo do arquivo foi lido com sucesso2!');
            }
        } catch (err) {
            console.error('Erro ao ler o conteúdo do arquivo:', err);

            return false;
        }
        return false;
    }

    
    verificarPromocao(idPromocao: string, campo: string, data: string): boolean {
        let promocoesJson = JSON.parse(fs.readFileSync(filePathPromocoes, 'utf-8'));
        
        if (promocoesJson && Array.isArray(promocoesJson)) {
            for (const promocao of promocoesJson) {
                if (promocao.id === idPromocao) {

                    switch (campo) {
                        case 'nome':
                            if (promocao.nome === data) {
                                return true;
                            }
                            break;

                        case 'valor':
                            if (promocao.valor === data) {
                                return true;
                            }
                            break;

                        case 'tipo':
                            if (promocao.tipo === data) {
                                return true;
                            }
                            break;

                        case 'validade':
                            if (promocao.validade === data) {
                                return true;
                            }
                            break;
                    }
                }
            }
        } 

        return false;
    }
    
    verificarBranco(promocaoData: PromocaoModel): Number {

            // Verificar se algum dos campos está vazio
            if (promocaoData.nome === '' || promocaoData.tipo === '' || promocaoData.validade === '') {
                return 1; // Se algum campo fora valor estiver vazio, retornar 1
            }else if(promocaoData.valor === '' ){
                return 2; // Se apenas o campo valor estiver vazio, retornar 2
            }
    
        return 3; // Se nenhum campo estiver vazio, retornar 3
    }

    verificarValor(): boolean {

            // Verificar se valor é um número de 10 a 70
            const valor = this.valor;
            if (Number(this.valor) < 10 || (Number(this.valor) > 70)) {
                return false; // Se valor não for um número de 10 a 70, retornar false
            }
    
        return true; // Se valor for um número de 10 a 70, retornar true
    }

}
  
export default PromocaoModel;