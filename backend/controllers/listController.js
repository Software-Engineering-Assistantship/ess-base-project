const ListModel = require('../models/List')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const Restaurant = require('../models/Restaurant')
const mongoose = require('mongoose');

const list_create = async (req, res) =>{
    const user = await User.findById(req.params.id)

    // check if user exists
    if(!user){
        console.log("Usuário não encontrado!")
        return
    }  

    if(!req.body.name){
        return res.status(404).json({ error: 'Nome não definido' })
    }

    // create new list with the proper parameters
    const list = new ListModel({
        name: req.body.name,
        restaurants: req.body.restaurants,
        description: req.body.description,
        author: user.name
    })

    // save the list
    await list.save()

    // making an array of the restaurant names to show it on json
    const restaurantIds = req.body.restaurants; 
    const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } }, 'name');
    
    res.json({
        name: list.name,
        description: list.description,
        restaurants: restaurants,
        author: list.author,
        id: list.id,
        __v: list.__v
    })
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

const list_edit = async(req, res) => {
    let list = await ListModel.findById(req.params.id);

    if(!list){
        return res.status(404).json({ error: 'Lista não encontrada' })
    }
    else{
        // if the list was found

        const remove_List = req.body.remove_list
        const add_List = req.body.add_list

        // removing what was required
        if (remove_List && remove_List.length > 0) {
            remove_List.forEach(removeId =>{
                if(list.restaurants.includes(removeId)){
                    list.restaurants.pop(removeId)
                }
            })
        }

        // adding what was required
        if(add_List && add_List.length > 0){
            add_List.forEach(addId => {
                if(!list.restaurants.includes(addId)){
                    list.restaurants.push(addId)
                }
            });
        }

        // updating infos
        list = await ListModel.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, description: req.body.description, restaurants: list.restaurants}, 
            { new: true }
        );
    }        

    // return data
    return res.json({list})
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
    list_edit,
    list_get,
    list_get_all,
    list_delete
}
