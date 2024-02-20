const ListModel = require('../models/listCollection')

const list_create = async (req, res) =>{
    const list = new ListModel(req.body)
    list.save()
    res.json(list)
}


const list_get = async (req,res) => {
    const list = await ListModel.findById(req.params.id)
    if(!list){
        return res.status(404).json({ error: 'Lista não encontrada' })
    }
    res.json(list)
}


const list_get_all = async (req,res) => {
    const lists = await ListModel.find()

    if(lists.length === 0){
        return res.status(404).json({ error: 'Você ainda não cadastrou nenhuma lista' })
    }

    res.json(lists)
}



const list_delete = async (req, res) => {
    const list = await ListModel.findByIdAndDelete(req.params.id)

    if (!list){
        return res.status(404).json({error: 'Lista não encontrada'})
    } else{
        res.json(list)
    }
}


module.exports = {
    list_create,
    list_get,
    list_get_all,
    list_delete
}