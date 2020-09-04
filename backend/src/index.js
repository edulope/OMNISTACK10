const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://Edulope:abcd1234@cluster0-grhxg.mongodb.net/test?retryWrites=true&w=majority')


app.use(cors(/*{origin: 'localhost'}*/))
app.use(express.json());//use serve pra dizer como o express vai tratar os dados

/*app.get('/', (Request, Response) => {//recebe request, response(automatico no express)
    //return Response.send("Salve cria"); manda um texto similar ao <p1>
    return Response.json({message: 'Salve cria'});
});//define o caminho*/
app.use(routes);
app.listen(3333);//define porta do local rost