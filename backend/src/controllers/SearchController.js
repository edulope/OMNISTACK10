const Dev = require("../models/Dev");
const ParseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response){
        console.log(request.query);
        const {latitude, longitude, techs} = request.query;

        const techsArray = ParseStringAsArray(techs);

        console.log(techsArray);

        const devs = await Dev.find({
            /*techs: {
                $in: techsArray,
            },*/
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,   
                },
            },
        });

        return response.json({devs});
    }
}