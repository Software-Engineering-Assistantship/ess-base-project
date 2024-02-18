import fs from 'fs';

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
    //     fs.writeFileSync('./src/models/promocoes.json', JSON.stringify(promocaoData));
    // }
    deletarPromocoes(){
            fs.unlinkSync('./src/models/promocoes.json');//delete promcoes.json
            console.log("Oi");
    }
    salvarPromocao(promocaoData: PromocaoModel) {
        // Carrega os dados existentes do arquivo JSON, se existirem
        let promocoesJson: PromocaoModel[] = [];
        if (fs.existsSync('./src/models/promocoes.json')) {
            const data = fs.readFileSync('./src/models/promocoes.json', 'utf-8');
            promocoesJson = JSON.parse(data);
        }

        // Adiciona a nova promoção aos dados existentes
        promocoesJson.push(promocaoData);

        // Escreve os dados atualizados no arquivo JSON
        fs.writeFileSync('./src/models/promocoes.json', JSON.stringify(promocoesJson));
    }

    verificarExistente(campo: string, data: string): boolean {
        let promocoesJson = JSON.parse(fs.readFileSync('./src/models/promocoes.json', 'utf-8'));
    
        switch (campo) {
            case 'nome':
                if (promocoesJson && Array.isArray(promocoesJson)) {
                    for (const promocao of promocoesJson) {
                        if (promocao.nome === data) {
                            return true;
                        }
                    }
                }
                break;
            case 'valor':
                if (promocoesJson && Array.isArray(promocoesJson)) {
                    for (const promocao of promocoesJson) {
                        if (promocao.valor == data) {
                            return true;
                        }
                    }
                }
                break;
            case 'tipo':
                if (promocoesJson && Array.isArray(promocoesJson)) {
                    for (const usuario of promocoesJson) {
                        if (usuario.tipo === data) {
                            return true;
                        }
                    }
                }
                break;
            case 'validade':
                if (promocoesJson && Array.isArray(promocoesJson)) {
                    for (const usuario of promocoesJson) {
                        if (usuario.validade === data) {
                            return true;
                        }
                    }
                }
                break;
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

    verificarValor(promocaoData: PromocaoModel): boolean {

            // Verificar se algum dos campos está vazio
            if (Number(promocaoData.valor) < 10 || Number(promocaoData.valor) > 70) {
                return true; // Se valor não for um número de 10 a 70, retornar true
            }
    
        return false; // Se valor for um número de 10 a 70, retornar false
    }

}
  
export default PromocaoModel;