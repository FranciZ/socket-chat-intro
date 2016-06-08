const express = require('express');
const mongoose  = require('mongoose');
const app = express();


const server    = require('http').Server(app);
const io        = require('socket.io')(server, { path: '/api/socket.io'});
const cors      = require('cors');
const bodyParser = require('body-parser');

const db        = require('./database');
const resources = require('./resources');
const socket    = require('./socket');
const expressValidator = require('express-validator');

const _ = require('lodash');

var corsOptions = {
    origin: 'http://franci.sae.proxima.si'
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended:true}));

db.init()
    .then(()=>{

        resources.init(app, io);
        socket.init(io);

    })
    .then(()=>{

        server.listen(3033, function(){

            console.log('All is well');

        });

    })
    .catch((err)=>{

        console.log(err);

    });






