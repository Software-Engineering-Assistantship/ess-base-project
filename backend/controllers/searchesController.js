const Restaurant = require("../models/Restaurant")

// does the search of the system
const search_get = async (req, res) => {
    const { name } = req.query;
    
    let query = {};

    // the search is done accordingly to the given parameters
    if (name) {
        query.name = name;
    }

    const restaurants = await Restaurant.find(query);

    if (restaurants.length === 0) {
        return res.status(404).json({ error: 'Nenhum restaurante foi encontrado para os critérios de busca fornecidos' });
    }
    else
    {
        res.json(restaurants);
    }
};

module.exports = {
    search_get
};
