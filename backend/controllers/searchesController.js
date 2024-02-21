const Restaurant = require("../models/Restaurant")

// does the search of the system
const search_get = async (req, res) => {
    const restaurants_ = await Restaurant.find()
    
    if (restaurants_.length === 0) {
        return res.status(404).json({ error: 'Nenhum restaurante foi encontrado porque ainda não há restaurantes cadastrados' })
    }

    const expected_properties = ['name'];

    // checks if the propety name is present
    const is_name_present = expected_properties.every(prop => req.body.hasOwnProperty(prop));

    if (!is_name_present) {
        // according to the stakeholder, if the search string is empty, the system should display all registered restaurants
        res.json(restaurants_);
    }
    else {
        // according to the stakeholder, it is necessary to show all restaurants that contain the name given as a substring in their own names
        const regex = new RegExp(req.body.name, 'i');

        const matched_restaurants = restaurants_.filter(restaurant => regex.test(restaurant.name));

        if (matched_restaurants.length === 0) {
            return res.status(404).json({ error: `Nenhum restaurante contém "${req.body.name}" no nome` });
        }
        else {
            // Return the matched restaurants
            return res.json(matched_restaurants);
        }
    }
}

module.exports = {
    search_get
};
