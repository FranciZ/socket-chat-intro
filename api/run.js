const express = require('express');
const mongoose  = require('mongoose');
const app = express();


const server    = require('http').Server(app);
const io        = require('socket.io')(server);
const cors      = require('cors');
const bodyParser = require('body-parser');

const db        = require('./database');
const resources = require('./resources');
const socket    = require('./socket');
const expressValidator = require('express-validator');

const _ = require('lodash');

app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended:true}));

db.init()
    .then(()=>{

        resources.init(app);
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






