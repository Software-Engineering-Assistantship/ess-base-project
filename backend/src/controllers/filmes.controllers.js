import fs from 'fs'
import path from 'path'


//Retorna todos os filmes da categoria AÇÃO
export const getAcaoJson = (req,res) =>{

    try {
        
        const data = JSON.parse(fs.readFileSync(path.resolve('./lista_filmes/acao.json'), 'utf-8'))

        if(!data){

            console.log("Lista vazia")
            return res.status(200).json({})
        }

        return res.status(200).json(data)

    } catch (error) {
        console.log("Error in getALL", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
//Retorna filmes de SUSPENSE
export const getSuspenseJson = (req,res) =>{

    try {
        
        const data = JSON.parse(fs.readFileSync(path.resolve('./lista_filmes/suspense.json'), 'utf-8'))

        if(!data){

            console.log("Lista vazia")
            return res.status(200).json({})
        }

        return res.status(200).json(data)

    } catch (error) {
        console.log("Error in getALL", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
//Retorna filmes de AVENTURA
export const getAventuraJson = (req,res) =>{

    try {
        
        const data = JSON.parse(fs.readFileSync(path.resolve('./lista_filmes/aventura.json'), 'utf-8'))

        if(!data){

            console.log("Lista vazia")
            return res.status(200).json({})
        }

        return res.status(200).json(data)

    } catch (error) {
        console.log("Error in getALL", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

//Retorna filmes de TERROR
export const getTerrorJson = (req,res) =>{

    try {
        
        const data = JSON.parse(fs.readFileSync(path.resolve('./lista_filmes/terror.json'), 'utf-8'))

        if(!data){

            console.log("Lista vazia")
            return res.status(200).json({})
        }

        return res.status(200).json(data)

    } catch (error) {
        console.log("Error in getALL", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
//Retorna filmes de DRAMA
export const getDramaJson = (req,res) =>{

    try {
        
        const data = JSON.parse(fs.readFileSync(path.resolve('./lista_filmes/drama.json'), 'utf-8'))

        if(!data){

            console.log("Lista vazia")
            return res.status(200).json({})
        }

        return res.status(200).json(data)

    } catch (error) {
        console.log("Error in getALL", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

//Retorna filmes de COMEDIA
export const getComediaJson = (req,res) =>{

    try {
        
        const data = JSON.parse(fs.readFileSync(path.resolve('./lista_filmes/comedia.json'), 'utf-8'))

        if(!data){

            console.log("Lista vazia")
            return res.status(200).json({})
        }

        return res.status(200).json(data)

    } catch (error) {
        console.log("Error in getALL", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

//Retorna filmes de ROMANCE
export const getRomanceJson = (req,res) =>{

    try {
        
        const data = JSON.parse(fs.readFileSync(path.resolve('./lista_filmes/romance.json'), 'utf-8'))

        if(!data){

            console.log("Lista vazia")
            return res.status(200).json({})
        }

        return res.status(200).json(data)

    } catch (error) {
        console.log("Error in getALL", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

//Retorna os filmes por nome do diretor
export const getDiretorJson =  (req,res) =>{
    try {
        
        const parser = JSON.parse(fs.readFileSync(path.resolve('./lista_filmes/acao.json'), 'utf-8'))
        const data = parser.filter(element => element.author === req.params.diretor_nome)

        return res.status(200).json(data)


    } catch (error) {
        console.log("Error in getBoodId", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
} 

