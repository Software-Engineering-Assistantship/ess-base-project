import fs from 'fs';
import path from 'path';

export const seriesCurtidas = async (req, res) => {
    try {
        const parser = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json'), 'utf-8'));
        
        // Filtra apenas os objetos do usuário especificado
        const userData = parser.filter(element => element.user === req.params.userid);

        if (userData.length === 0) {
            console.log("Nenhum dado encontrado para o usuário:", req.params.userid);
            return res.status(404).json({ error: "Usuário não encontrado ou sem séries curtidas" });
        }

        // Extrai apenas a propriedade "Séries Curtidas"
        // const seriesCurtidas = userData.map(item => ({
        //     "Séries Curtidas": item["Séries Curtidas"]
        // }));
        const seriesCurtidas = userData.map(item => item["Séries Curtidas"]).flat();


        res.status(200).json(seriesCurtidas);
    } catch (error) {
        console.log("Erro na função get seriesCurtidas:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const curtir = async(req, res) => {
    console.log(req.body)
    try {

        const { userid } = req.params;
        const { serie } = req.body;

        const filePath = path.resolve('./src/database/users.json');

        let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        let user = data.find(element => element.user == userid);

        if (typeof user["Séries Curtidas"] === "string") {
            user["Séries Curtidas"] = [user["Séries Curtidas"]];
        }

        if (!user["Séries Curtidas"]) {
            user["Séries Curtidas"] = [];
        }

        if (user["Séries Curtidas"].includes(serie)) {
            console.log(`Série "${serie}" já foi curtida pelo usuário "${userid}"`);
            return res.status(400).json({ error: "Série já foi curtida pelo usuário" });
        }

        user["Séries Curtidas"].push(serie);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.status(200).json({ message: "Série curtida com sucesso!", user });
    } catch (error) {
        console.error("Erro na função curtir:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const descurtir = async(req,res) => {
    try {
        const filePath = path.resolve('./src/database/users.json');
        const { userid } = req.params;
        const { serie } = req.body;
        
        // Ler o arquivo JSON
        let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Encontrar o usuário
        let user = data.find(element => element.user === userid);

        if (!user) {
            console.log("Usuário não encontrado:", userid);
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Se "Séries Curtidas" for uma string, transforma em array
        if (typeof user["Séries Curtidas"] === "string") {
            user["Séries Curtidas"] = [user["Séries Curtidas"]];
        }

        // Se não existir, inicializa como array vazio
        if (!user["Séries Curtidas"]) {
            user["Séries Curtidas"] = [];
        }

        // Verificar se a série existe na lista
        if (!user["Séries Curtidas"].includes(serie)) {
            console.log(`Série "${serie}" não encontrada para o usuário "${userid}"`);
            return res.status(400).json({ error: "Série não encontrada na lista do usuário" });
        }
        
        // // Remover a série do array
        user["Séries Curtidas"] = user["Séries Curtidas"].filter(s => s !== serie);

        // Escrever de volta no arquivo JSON
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.status(200).json({ message: "Série removida com sucesso!", user });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}