const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringAsArray')
const {findConnections, sendMessage} = require('../websocket')

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();//filtros podem ser feitos dentro dos parenteses
    
    return response.json(devs);
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${ github_username }`);

            /*const { name, avatar_url, bio } = apiResponse.data;
            if (!name) {
                name = apiResponse.data.login;
            }*/
            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = ParseStringAsArray(techs);
            console.log(name, avatar_url, bio, github_username);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
            console.log(request.body);

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )

            console.log(sendSocketMessageTo);
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        return response.json(dev);
    },


    async update(request, response){
        const {github_username, name, avatar_url, bio, techs, location} = request.query;
        const dev = await Dev.findOne({github_username: github_username},(err, obj) => {
            if(obj){
                /*if(obj.name != name)obj.name = name;
                if(obj.avatar_url != avatar_url)obj.avatar_url != avatar_url
                if(obj.bio != bio)obj.bio = bio;
                if(obj.techs != techs)obj.techs = techs;
                if(obj.location != location)obj.location = location;*/

                obj.name = "funcionou?"
                obj.save((err, update) => {
                    response.send(update);
                })
            }
        })
    },

    async destroy(request, response){
        const {github_username} = request.query;
        const dev = await Dev.remove({github_username: github_username});//filtros podem ser feitos dentro dos parenteses
    
        return response.json(dev);
    }
};