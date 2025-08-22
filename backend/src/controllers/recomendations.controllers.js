import fs from 'fs';
import path from 'path';

export const top10 = async (req, res) => {
    try {
        const parser = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json'), 'utf-8'));
        
        // Filtra apenas os objetos do usuário especificado
        const userData = parser.find(element => element.user === 'Sistema');

        if (userData.length === 0) {
            console.log("Nenhum dado encontrado para o usuário:", 'Sistema');
            return res.status(404).json({ error: "Usuário não encontrado ou sem séries curtidas" });
        }

        const top10 = userData.top10

        res.status(200).json(top10);
    } catch (error) {
        console.log("Erro na função get top10:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const recomendacaoGeral = async (req, res) => {
    try {
        const parser = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json'), 'utf-8'));
        
        // Filtra apenas os objetos do usuário especificado
        const userData = parser.find(element => element.user === 'Sistema');

        if (userData.length === 0) {
            console.log("Nenhum dado encontrado para o usuário:", 'Sistema');
            return res.status(404).json({ error: "Usuário não encontrado ou sem séries curtidas" });
        }

        const geral = userData.geral

        res.status(200).json(geral);
    } catch (error) {
        console.log("Erro na função get recomendacaoGeral:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const recomendacaoGenero = async (req, res) => {
    try {
        const { generoid } = req.params;  // Recebe o gênero pelo parâmetro
        const parser = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json'), 'utf-8'));

        // Filtra o usuário "Sistema"
        const userData = parser.find(element => element.user === 'Sistema');

        if (!userData) {
            console.log("Nenhum dado encontrado para o usuário:", 'Sistema');
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Verifica se o gênero existe no usuário
        if (!userData[generoid]) {
            console.log(`Gênero '${generoid}' não encontrado.`);
            return res.status(404).json({ error: `Gênero '${generoid}' não encontrado.` });
        }

        // Retorna a lista de filmes do gênero solicitado
        const recomendacaoGenero = userData[generoid];

        res.status(200).json(recomendacaoGenero);
    } catch (error) {
        console.log("Erro na função get top10:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};